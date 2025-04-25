const mysql = require("mysql2");
 

const connection = mysql.createConnection({
    host: 'localhost',
    user:   "root",
    password: "@Sibu8167",
    database: "room_booking"
});

connection.connect((err)=>{
    if(err){
        console.error("error connctiong to MySQL: ",err.message);
    }else{
        console.log("Connected to MySQL DB");
    }
})

module.exports = connection;