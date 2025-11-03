// controllers/quotesController.js
const Quote = require('../models/Quote');

// GET /api/quotes → list all quotes, sorted by number ascending
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ number: 1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/quotes/:id → single quote by ID
exports.getQuote = async (req, res) => {
  try {
    const q = await Quote.findById(req.params.id);
    if (!q) return res.status(404).json({ message: 'Quote not found' });
    res.json(q);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/quotes → create new quote with auto-incremented number
exports.createQuote = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.length > 190) {
      return res.status(400).json({ message: 'Text is required and max 190 chars' });
    }
    const last = await Quote.findOne().sort({ number: -1 }).select('number');
    const nextNumber = last ? last.number + 1 : 1;

    const newQ = await Quote.create({
      number: nextNumber,
      text
    });
    res.status(201).json(newQ);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/quotes/:id → update quote text
exports.updateQuote = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.length > 190) {
      return res.status(400).json({ message: 'Text is required and max 190 chars' });
    }
    const updated = await Quote.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Quote not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/quotes/:id → delete a quote
exports.deleteQuote = async (req, res) => {
  try {
    const deleted = await Quote.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Quote not found' });
    res.json({ message: 'Quote deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/quotes/current → get the “rotating” current quote
exports.getCurrentQuote = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ number: 1 });
    if (!quotes.length) return res.status(404).json({ message: 'No quotes available' });

    let startIdx = quotes.findIndex(q => q.isCurrent);
    if (startIdx < 0) startIdx = 0;

    const startTime = new Date(quotes[startIdx].updatedAt);

    // helper to convert any date to IST midnight
    function toISTMidnight(date) {
      const istOffset = 5.5 * 60; // minutes
      const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
      const ist = new Date(utc + istOffset * 60000);
      ist.setHours(0, 0, 0, 0);
      return ist;
    }

    const startMidnightIST = toISTMidnight(startTime);
    const nowMidnightIST   = toISTMidnight(new Date());

    // number of days passed in IST
    const steps = Math.floor(
      (nowMidnightIST - startMidnightIST) / (24 * 60 * 60 * 1000)
    );

    const currentIdx = (startIdx + steps) % quotes.length;
    res.json(quotes[currentIdx]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/quotes/current/:id → mark a quote as the new starting point
exports.setCurrentQuote = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Unmark all other quotes
    await Quote.updateMany({}, { $set: { isCurrent: false } });

    // 2. Set selected quote as current and update timestamp
    const updated = await Quote.findByIdAndUpdate(
      id,
      { isCurrent: true, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Quote not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
