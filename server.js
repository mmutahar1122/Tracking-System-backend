const express = require('express');
const connectDB = require('./mongodb/mongodb');
const app = express();
const cors = require('cors')
const routes = require('./Routes/routes')
const authRoutes = require('./Routes/authRoutes');
// const userRoutes = require('./Routes/userRoutes');
const feedback = require()
const seatRoutes = require('./Routes/seatRoutes');
const alertRoutes = require('./Routes/alertRoutes');
const port = 3005;
app.use(cors());
app.use(express.json());
connectDB();



app.use('/api/auth', authRoutes);
// app.use('/api', userRoutes);
// app.use('/api/seats', seatRoutes);
// app.use('/api/alerts', alertRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/alerts', alertRoutes);


app.listen(port,()=>{
    console.log(`server is runnig at port no ${port}`)
})