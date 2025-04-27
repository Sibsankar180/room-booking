const {addRoom,getAllRooms,searchRooms} = require("../models/roomModel.js");

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

const filterRooms = (req,res) => {

    const { location, minPrice, maxPrice, check_in, check_out} = req.query;
    
    if(!check_in || !check_out ){
        return res.status(400).send("please provide check_in and check_out dates");
    }

    const filters = {
        location,
        minPrice: parseFloat(minPrice) || 0,
        maxPrice: parseFloat(maxPrice) || 10000,
        check_in , 
        check_out
    };

    searchRooms(filters,(err,results) => {
        if(err) return res.status(500).send("search failed");

        res.json(results);
    });

};

module.exports = {createRoom,listRooms,filterRooms};