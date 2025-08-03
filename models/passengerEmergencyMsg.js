
const mongoose = require('mongoose');

const EmergencyMessage= new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name is required"]
    },
    // email:{
    //     type: String,
    //     required: [true, "email is required"]
    // },
    message:{
        type: String,
        required: [true, "message is required"]
    },
    busNo:{
        type: String,
        required: [true, "bus no required"]
    },
    date: {
    type: Date,
    default: Date.now, // sets current date and time automatically
    required: [true, "Date is required"]
}
})

const alertMessage= mongoose.model('EmergencyMessage', EmergencyMessage)

module.exports= alertMessage;