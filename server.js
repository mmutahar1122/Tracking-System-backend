const express = require('express');
const connectDB = require('./mongodb/mongodb');
const app = express();
const cors = require('cors')
const User = require('./models/signupuser.js');
const port = 3001;
app.use(cors());
app.use(express.json());
connectDB();




app.get('/',(req, res)=>{

    res.end("hello! world");

})

app.post('/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const newUser = new User({
      name,
      email,
      age
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User saved successfully', data: savedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/logindata',(req, res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        res.status(400).json({message: "Email and Password are required" })
    }
    res.end("hello! world post data");
console.log('Body:', req.body);
})

app.post('/signupdata',(req, res)=>{
    const {name,email,password,confirm_Password}=req.body;

    if(!name || !email || !password || !confirm_Password){
        res.status(400).json({message:"All Field Data is require"});
    }

    console.log(req.body);
    res.json({message:"success full signup"});

})
app.listen(port,()=>{
    console.log(`server is runnig at port no ${port}`)
})