const mongoose=require('mongoose');

const connectDB=async()=>{

    try{
        mongoose.connect('mongodb://127.0.0.1:27017/smart_safar', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
console.log('✅ MongoDB connected successfully');


    }
    catch (err){
        console.log("err",err.message);
    }
}

module.exports = connectDB;



// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB Connected");
//   } catch (err) {
//     console.error("❌ Error connecting MongoDB:", err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
