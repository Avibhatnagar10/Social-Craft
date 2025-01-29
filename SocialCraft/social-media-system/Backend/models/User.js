const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  socialMediaHandle: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of image URLs
    required: true,
  },
  email: {
    type: String,
    required: true, // Email is now mandatory
  },
});

module.exports = mongoose.model('User', UserSchema);
