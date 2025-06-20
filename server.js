const express = require('express');
const connectDB = require('./mongodb/mongodb');
const app = express();
const cors = require('cors')
const routes = require('./Routes/routes')
const port = 3001;
app.use(cors());
app.use(express.json());
connectDB();


app.use('/', routes);


app.listen(port,()=>{
    console.log(`server is runnig at port no ${port}`)
})