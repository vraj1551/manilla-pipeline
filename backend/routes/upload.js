// routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Ensure uploads/images exists
const uploadsRoot = path.join(__dirname, '../uploads');
const imagesDir = path.join(uploadsRoot, 'images');
if (!fs.existsSync(uploadsRoot)) fs.mkdirSync(uploadsRoot);
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);

// Multer in-memory storage (so we can process with Sharp)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (req, file, cb) => {
    // Accept common web-friendly types
    const allowed = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      // 'image/heic', // uncomment if your stack can handle HEIC via additional libs
      // 'image/heif',
    ];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Unsupported image type. Please upload JPG, PNG, or WEBP.'));
    }
    cb(null, true);
  }
});

// POST /api/upload  (field name: "image")
router.post('/upload', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const baseName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileWebp = path.join(imagesDir, `${baseName}.webp`);

    // Convert to webp @ ~85 quality, resize if enormous (optional)
    let pipeline = sharp(req.file.buffer).rotate(); // auto-orient by EXIF
    // Optional max width to prevent massive originals (uncomment if you want)
    // pipeline = pipeline.resize({ width: 2000, withoutEnlargement: true });

    await pipeline.webp({ quality: 85 }).toFile(fileWebp);

    // Return public URL path (served by Express static: app.use('/uploads', express.static(...)))
    const url = `/uploads/images/${path.basename(fileWebp)}`;
    return res.json({ url });
  } catch (err) {
    console.error('Upload error:', err);
    if (err.message && err.message.includes('Unsupported image type')) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Server error while uploading image' });
  }
});

module.exports = router;