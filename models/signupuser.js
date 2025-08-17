const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
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
  // age: {
  //   type: Number,
  //   required: false
  // }
});

const SignupUser = mongoose.model('signup_users', userSchema);

module.exports = SignupUser;