const express = require("express");
const { createRoom,  listRooms, filterRooms } = require("../controllers/roomController.js");
const router = express.Router();

router.post('/',createRoom);

router.get('/',listRooms);

router.get('/search',filterRooms);

module.exports = router;
