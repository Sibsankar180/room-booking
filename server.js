//require('dotenv').config();
const express =require('express');
const cors = require("cors");
const db = require("./config/db.js");
const userRoutes = require('./routes/userRoutes.js');
const roomRoutes = require('./routes/roomRoutes.js');
const bookingRoutes = require("./routes/bookingRoutes.js");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get('/',(req,res)=>{
    res.send("room booking API is running!");
});

app.listen(PORT,()=>{
    console.log(`server runnging on port ${PORT}`);
});

app.use('/api/users',userRoutes);

app.use('/api/rooms',roomRoutes);

app.use('/api/bookings',bookingRoutes);


