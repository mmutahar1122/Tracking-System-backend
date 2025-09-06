const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type:String,
    required:true,
  },
  confirm_password:{
    type:String,
    required:true,
  },
  cnic: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true
  },
  location: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true, // force user to send location
  },
},
});

// ✅ Create a 2dsphere index for location queries
driverSchema.index({ location: "2dsphere" });

const SignupDriver = mongoose.model('signup_driver', driverSchema);

module.exports = SignupDriver;
