const {createBooking, getBookingsByUser}= require("../models/bookingModel.js");

const bookRoom =(req,res) =>{
    const bookingData = req.body;

    createBooking(bookingData,(err,result)=>{
        if(err) return res.status(500).send("booking failed");
        res.status(200).send("Room Booked Successfully");
    });
};

const getUserBookings = (req,res) =>{
    const { user_id } = req.body;

    getBookingsByUser(user_id, (err,results) => {
      if(err) return res.staus(500).send("could not fetch bookings");
      res.json(results);
    });
};

module.exports = {
    bookRoom, getUserBookings
};