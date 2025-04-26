const {createBooking, getBookingsByUser, checkRoomAvailability}= require("../models/bookingModel.js");


const bookRoom =(req,res) =>{
    const bookingData = req.body;
    const {room_id,check_in,check_out} = bookingData;

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

const getUserBookings = (req,res) =>{
    const { user_id } = req.params;

    getBookingsByUser(user_id, (err,results) => {
      if(err) return res.staus(500).send("could not fetch bookings");
      res.json(results);
    });
};



module.exports = {
    bookRoom, getUserBookings
};