const {bookRoom, getUserBookings }  = require("../controllers/bookingController.js");
const express = require("express");

const router = express.Router();


router.post('/',bookRoom);
router.get("/:user_id",getUserBookings);

module.exports = router;