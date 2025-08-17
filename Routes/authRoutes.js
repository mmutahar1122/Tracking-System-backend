const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/signupuser');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;




router.post('/signup', async (req, res) => {
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

   router.post('/signin',async(req,res)=>{
    const {email, password} = req.body;
    console.log(email, password);
     if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
   try {
    const user = await User.findOne({ email });
    console.log("user",user)

    if (user) {
      const isMatch= await bcrypt.compare(password, user.password);
       if(!isMatch){
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const payload = {
    id: user.id,
    email: user.email
  };

    // Sign JWT
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  console.log("JWT is:", typeof jwt); // Should log "object"

     return res.json({ message: 'Login successful', token });

    } else {
      return res.status(404).json({ message: "User not found", exists: false }); // ✅ 404
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
   })

module.exports = router; 
