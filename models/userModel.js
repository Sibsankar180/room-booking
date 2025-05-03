const db = require('../config/db.js');
const createUser = (name,email,hashedPassword,callback) =>{
    const sql = 'insert into users (name,email,password) values(?,?,?)';
    db.query(sql,[name,email,hashedPassword],callback);
};

const findUserByEmail = (email,callback) =>{
    const sql = 'select * from users where email = ?';
    db.query(sql,[email],callback);
};

const updateUserProfile = ( userId, userData, callback) =>{
    const { name, email} = userData;

 if(name && email){

    const sql = `update users set name = ? , email = ? where id = ?`;
    db.query(sql,[name,email,userId],callback);

  }
   
}


const getUserProfile = (userId,callback) =>{
    const id = userId;

    const sql = `select name,email from users where id = ?`;
    db.query(sql,[id],callback);
}

module.exports = {createUser,findUserByEmail, updateUserProfile,getUserProfile};
