const db = require("../config/db.js");

const addRoom = (roomData,callback)=>{
    const {title, description, price ,location } = roomData;

    const sql = 'insert into rooms(title,description,price,location) values(?,?,?,?)';

    db.query(sql,[title,description,price,location],callback);
};

const getAllRooms = (callback) =>{
    const sql = 'select * from rooms where is_available = true';
    db.query(sql,callback);
};

const searchRooms = (filters, callback ) => {
    const{ location, minPrice, maxPrice, check_in, check_out } = filters;
  
  const sql = "  SELECT * FROM rooms  WHERE is_available = TRUE AND price BETWEEN ? AND ? AND location LIKE ?AND id NOT IN (SELECT room_id FROM bookings WHERE ((check_in <= ? AND check_out > ?) OR (check_in < ? AND check_out >= ?) OR(check_in >= ? AND check_out <= ?))) ";

    

    const values = [minPrice || 0, maxPrice || 10000, `%${location || ''}%` , check_in,check_in,check_out,check_out, check_in, check_out ];

    db.query( sql, values,  callback );

}
module.exports = {addRoom,getAllRooms,searchRooms};