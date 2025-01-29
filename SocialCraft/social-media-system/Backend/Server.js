const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

const User = require('./models/User'); // Correct path to the model

// Initialize the app
const app = express();
app.use(express.json());
app.use(cors());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer for Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'social_media_system',
    allowed_formats: ['jpeg', 'png', 'jpg', 'gif'],
  },
});

const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/users/submit', upload.array('images', 10), async (req, res) => {
  try {
    const { name, socialMediaHandle, email } = req.body;

    if (!name || !socialMediaHandle || !email || !req.files.length) {
      return res
        .status(400)
        .json({ error: 'Missing required fields or no files uploaded' });
    }

    const imageUrls = req.files.map((file) => file.path); // Get Cloudinary URLs

    const newUser = new User({
      name,
      socialMediaHandle,
      images: imageUrls,
      email,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error while saving user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: err.message || 'Something went wrong' });
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
