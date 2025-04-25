const express = require('express');
const { registerUser, loginUser } = require('c:\\Users\\sibsa\\Desktop\\room\\room-booking\\controllers\\userController.js');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
