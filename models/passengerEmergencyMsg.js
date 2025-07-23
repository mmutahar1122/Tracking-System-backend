
const mongoose = require('mongoose');

const EmergencyMessage= new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name is required"]
    },
    email:{
        type: String,
        required: [true, "email is required"]
    },
    message:{
        type: String,
        required: [true, "message is required"]
    },
    busNo:{
        type: String,
        required: [true, "bus no required"]
    },
})

const alertMessage= mongoose.model('EmergencyMessage', EmergencyMessage)

module.exports= alertMessage;