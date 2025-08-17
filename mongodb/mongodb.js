const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/smart_safar', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ MongoDB connected successfully');

    }
    catch (err){
        console.log("err",err.message);
    }
}

module.exports = connectDB;