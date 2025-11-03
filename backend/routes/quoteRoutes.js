const express = require('express');
const router  = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  getAllQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
  getCurrentQuote,
  setCurrentQuote
} = require('../controllers/quotesController');

// Current‐quote endpoints (must be before /:id)
router.get('/current',        getCurrentQuote);
router.put('/current/:id',    protect, setCurrentQuote);

// Public listing & lookup
router.get('/',               getAllQuotes);
router.get('/:id',            getQuote);

// Admin‐only CRUD
router.post('/',     protect, createQuote);
router.put('/:id',   protect, updateQuote);
router.delete('/:id', protect, deleteQuote);

module.exports = router;
