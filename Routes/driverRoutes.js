const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Driver = require('../models/signupdriver');

require('dotenv').config();





router.post('/signup-driver', async (req, res) => {
  const { name, email, password, confirm_password, cnic, pin, latitude, longitude } = req.body;

  if (!name || !email || !password || !confirm_password || !cnic || !pin) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Driver({
      name,
      email,
      password: hashedPassword,
      confirm_password: hashedPassword,
      cnic,
      pin,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User saved', user: savedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


   

module.exports = router; 
