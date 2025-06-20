// routes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/signupuser'); 


router.post('/users', async (req, res) => {
  const {  name, email, password, confirm_password } = req.body;
  console.log(' name, email, password, confirm_Password ', req.body);
  if (!name || !email || !password || !confirm_password) {
   return res.status(400).json({ message: 'All fields are required' });
  }
    
try {
    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

    // Create new user with hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      confirm_password: hashedPassword // optional: you can remove this field from DB
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User saved', user: savedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

}
   );

   router.post('/checkuser',async(req,res)=>{
    const {email, password} = req.body;
    
     if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
   try {
    const user = await User.findOne({ email });

    if (user) {
      const isMatch= await bcrypt.compare(password, user.password);
       if(!isMatch){
        return res.status(401).json({ message: 'Invalid email or password' });
      }
     return res.status(200).json({ message: 'Login successful' });

    } else {
      return res.status(404).json({ message: "User not found", exists: false }); // ✅ 404
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
   })

router.get('/users', async (req, res) => {
  try {
    
    const users = await User.find(); // Get all documents from 'users' collection
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
});

router.post('/logindata', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  console.log('Login Data:', req.body);
  res.json({ message: 'Login successful' });
});


module.exports = router; 
