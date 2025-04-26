const {addRoom,getAllRooms} = require("../models/roomModel.js");

const createRoom = (req,res) =>{
    addRoom(req.body,(err,result)=>{
        if(err) return res.status(500).send("Fail to add room");

        res.status(201).send("room added succesfully");
    });
};

const listRooms = (req,res) =>{
    getAllRooms((err,results) =>{
        if(err) return res.status(500).send("Falied to fetch rooms");
        res.json(results);
    });
};

module.exports = {createRoom,listRooms};