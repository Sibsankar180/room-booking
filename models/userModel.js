const db = require('../config/db.js');
const createUser = (name,email,hashedPassword,callback) =>{
    const sql = 'insert into users (name,email,password) values(?,?,?)';
    db.query(sql,[name,email,hashedPassword],callback);
};

const findUserByEmail = (email,callback) =>{
    const sql = 'select * from users where email = ?';
    db.query(sql,[email],callback);
};

module.exports = {createUser,findUserByEmail};
