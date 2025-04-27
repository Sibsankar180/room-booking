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

    const sql1 = 'select * from rooms where is_avilable = true and price between ? and ? and location';
    const sql2 = 'like ? and id not in ( select room_id from bookings where ( ( check_in <= ? and check_out > ?) or (check_in < ? and check_out';
    const sql3 =   '  >= ?) or (check_in >= ? and check_out <= ?)))';

    const sql = sql1 + sql2 + sql3;

    const values = [minPrice || 0, maxPrice || 10000, `%${location || ''}%` , check_in,check_in,check_out,check_out, check_in, check_out ];

    db.query( sql, values,  callback );

}
module.exports = {addRoom,getAllRooms,searchRooms};