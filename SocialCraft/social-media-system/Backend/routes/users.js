// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const User = require('../models/User');
// const router = express.Router();

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error('Invalid file type'), false);
//     }
//     cb(null, true);
//   },
// });

// // Route to submit user data and images
// // router.post('/submit', (req, res) => {
// //   upload.array('images', 10)(req, res, (err) => {
// //     if (err instanceof multer.MulterError) {
// //       return res.status(400).json({ error: err.message });
// //     } else if (err) {
// //       return res.status(500).json({ error: err.message });
// //     }
// //     // Proceed with the logic
// //     const { name, socialMediaHandle } = req.body;
// //     const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
// //     const newUser = new User({ name, socialMediaHandle, images: imageUrls });
// //     newUser
// //       .save()
// //       .then(user => res.status(201).json(user))
// //       .catch(err => res.status(500).json({ error: 'Error saving data dikkat' }));
// //   });
// // });
// router.post('/submit', upload.array('images', 10), async (req, res) => {
//   try {
//     const { name, socialMediaHandle } = req.body;
//     if (!name || !socialMediaHandle || req.files.length === 0) {
//       return res.status(400).json({ error: 'Missing required fields or no files uploaded' });
//     }

//     const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
//     console.log('Image URLs:', imageUrls);

//     const newUser = new User({
//       name,
//       socialMediaHandle,
//       images: imageUrls,
//     });

//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     console.error('Detailed Error:', err);  // Log more detailed error
//     res.status(500).json({ error: err.message || 'Error saving data' });
//   }
// });




// // Route to get all user submissions
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching users' });
//   }
// });

// module.exports = router;


const express = require('express');
const User = require('./models/User');

module.exports = (upload) => {
  const router = express.Router();

  // Submit user data and images to Cloudinary
  router.post('/submit', upload.array('images', 10), async (req, res) => {
    try {
      const { name, socialMediaHandle, email } = req.body;

      // Validate required fields
      if (!name || !socialMediaHandle || !req.files.length) {
        return res.status(400).json({ error: 'Missing required fields or no files uploaded' });
      }

      // Extract image URLs from Cloudinary
      const imageUrls = req.files.map((file) => file.path);

      // Create and save a new user
      const newUser = new User({
        name,
        socialMediaHandle,
        email,
        images: imageUrls,
      });

      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      console.error('Error saving user data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get all user submissions
  router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};
