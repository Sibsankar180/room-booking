const db = require("../config/db");

const addRoom = (roomData,callback)=>{
    const {title,description,price,location}=roomData;

    const sql = 'insert into rooms(title,description,price,location) values(?,?,?,?)';

    db.query(sql,[title,description,price,location],callback);
};

const getAllRooms = (callback) =>{
    const sql = 'select * from rooms where is_available = true';
    db.query(sql,callback);
};

module.exports = {addRoom,getAllRooms};