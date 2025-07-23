// routes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/signupuser'); 
const reservedSeat = require('../models/seatBooking');
const AlertMessage = require('../models/passengerEmergencyMsg')


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
    console.log(email, password);
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
router.get('/bookedSeates', async (req, res) => {
  // Example: send back some seat data
  const bookedSeats = await reservedSeat.find();


  res.json(bookedSeats); // Send JSON data
});


router.get('/users', async (req, res) => {
  try {
    
    const users = await User.find(); // Get all documents from 'users' collection
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
});


router.post('/reservseat',async (req, res)=>{
  const {name, phoneNo, cnic, from, to, busNo, seatSelected, totalPrice,date} = req.body

  const ReserveSeat= new reservedSeat({
    name,
    phoneNo,
    cnic,
    from,
    to,
    busNo,
    seatSelected,
    totalPrice,
    date,
  });

  const saveReserveSeat = await ReserveSeat.save();
  console.log("=-req.body=-",req.body);
  res.send(req.body)
})



router.post('/alert-message', async (req, res) => {
    try {
        const { name, email, message, busNo } = req.body;

        // Optional double-check before schema validation
        if (!name || !email || !message || !busNo) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newMessage = new AlertMessage({ name, email, message, busNo });

        const savedMessage = await newMessage.save();

        res.status(201).json({
            message: 'Emergency message saved successfully',
            data: savedMessage,
        });
    } catch (error) {
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/alert-message', async (req, res) => {
  try {
    const messages = await AlertMessage.find();
    console.log(messages);
    res.status(200).json(messages); // Respond with found messages
  } catch (error) {
    console.error('Error fetching alert messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});



module.exports = router; 
