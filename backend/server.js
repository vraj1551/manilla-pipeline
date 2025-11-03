const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();
const connectDB = require('./config/db');
const User = require('./models/User'); // ensure path is correct

const app = express();

// ✅ Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ✅ Allow specified origins
app.use(cors({
  origin: [
    'http://localhost:5173', // ✅ for client frontend
    'http://localhost:5174', // ✅ for admin panel
    'https://admin.manilla.co.in',
    'https://manilla.co.in',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  credentials: true,
}));

// Middleware
app.use(express.json({limit: '10mb'}));
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api', require('./routes/upload'));
app.use('/api/quotes', require('./routes/quoteRoutes'));

// ✅ Handle preflight OPTIONS requests globally
app.options('*', cors());

async function bootstrap() {
  await connectDB();

  // Ensure indexes (important for unique constraints)
  await User.init();

  // Seed default admin if missing
  const adminEmail = (process.env.ADMIN_EMAIL || 'bella@admin').toLowerCase();
  const adminUsername = process.env.ADMIN_USERNAME || 'bella@admin';
  const adminPassword = process.env.ADMIN_PASSWORD || '123nimda';

  try {
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      await User.create({
        email: adminEmail,
        username: adminUsername,
        password: adminPassword, // hashed automatically via pre-save
        role: 'admin',
      });
      console.log(`🛠 Created default admin user: ${adminEmail} / username: ${adminUsername}`);
    } else {
      console.log(`🔒 Admin user already exists: ${adminEmail}`);
    }
  } catch (e) {
    console.error('Error during admin seeding:', e);
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

bootstrap();
