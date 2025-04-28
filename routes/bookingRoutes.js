const {bookRoom, getUserBookings ,verifyToken }  = require("../controllers/bookingController.js");
const express = require("express");

const router = express.Router();


router.post('/',verifyToken,bookRoom);
router.get("/:user_id",getUserBookings);

module.exports = router;