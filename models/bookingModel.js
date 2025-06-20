const db = require("../config/db.js");

const createBooking = (bookingData,callback) =>{

    const { user_id, room_id, check_in, check_out } = bookingData;

    const sql = 'insert into bookings(user_id,room_id,check_in,check_out) values(?,?,?,?)';

    db.query(sql,[user_id,room_id,check_in,check_out],callback);
};

const getBookingsByUser = (user_id,callback) =>{
    const sql =  'select b.*,r.title, r.location from bookings b join rooms r on b.room_id = r.id where b.user_id =?';
    db.query(sql,[user_id],callback);
};

const checkRoomAvailability = (room_id, check_in, check_out,callback) => {
    const sql ='select * from bookings where room_id = ? and ( (check_in <= ? and check_out > ?) or (check_in < ? and check_out >= ?) or (check_in < ? and check_out >= ?))';
    db.query(sql,[room_id,check_in,check_in,check_out,check_out,check_in,check_out],callback);
};


module.exports = {createBooking, getBookingsByUser, checkRoomAvailability };