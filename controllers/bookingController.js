const {createBooking, getBookingsByUser, checkRoomAvailability}= require("../models/bookingModel.js");

const jwt = require("jsonwebtoken");

//Middleware to verify JWT token
//we need to verify in bookRoom function

const verifyToken = (req,res,next) => {

  const token = req.headers['authorization']?.split(' ')[1]; // 

  if(!token) return res.status(403).send('Token required');

  jwt.verify( token ,'your_jwt_secret', (err,decoded) =>{
    // jwt.verify() => verify token if it is right then , jwt gives user's info into "decoded ".
    if(err) return res.status(401).send("Invalid token");

    req.user = decoded; // store user'info in request, so that 'bookRoom' get this user properly.

    next();  // move next controller or middleware, here it is bookRoom, because in routes after 'verifyToken' , 'bookRoom' is used'. Without next(); request will hang forever.

  });

};



const bookRoom =(req,res) =>{
   
    const bookingData = req.body;
    const {user_id,room_id,check_in,check_out} = bookingData;

    checkRoomAvailability(room_id,check_in,check_out,(err,results) => {

          if(err) return res.status(500).send("Error checking avilability");
 

          // in results , how rows are fetched by executing query will be stored.
          if(results.length > 0){ 
            return res.status(409).send("Room not available for selected dates");
          }

          createBooking(bookingData,(err,result)=>{
            if(err) return res.status(500).send("booking failed");
            res.status(200).send("Room Booked Successfully");
        });

    });

};

const getUserBookings = (req,res) => {
    const { user_id } = req.params;

    getBookingsByUser(user_id, (err,results) => {
      if(err) return res.staus(500).send("could not fetch bookings");
      res.json(results);
    });
};



module.exports = {
    bookRoom, getUserBookings ,verifyToken
};