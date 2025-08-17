const express = require('express');
const router = express.Router();
const AlertMessage = require('../models/passengerEmergencyMsg');

router.post('/alert-message', async (req, res) => {
    try {
        const { name, email, message, busNo } = req.body;

        // Optional double-check before schema validation
        if (!name || !message || !busNo) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newMessage = new AlertMessage({ name, email, message, busNo });

        const savedMessage = await newMessage.save();

        res.status(201).json({
            message: 'Emergency message sent successfully',
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
    res.status(500).json({ error: 'Server Error' });
  }
});


router.post('/dismiss-alert-message', async (req, res)=>{
  const {id}=req.body
  try {
  console.log("-=-=-=id-=-=-=", id);

  const CancelAction = await AlertMessage.findByIdAndDelete(id);

  if (!CancelAction) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json({ message: 'User removed successfully', data: CancelAction });
} catch (error) {
  console.error('Failed to Dismiss Action:', error);
  res.status(500).json({ error: 'Failed to Dismiss Action' });
}
})


module.exports = router; 
