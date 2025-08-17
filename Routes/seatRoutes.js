const express = require('express');
const router = express.Router();
const reservedSeat = require('../models/seatBooking');


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

module.exports = router; 
