const express = require('express');
const { registerUser, loginUser, updateProfile ,verifyToken } = require('../controllers/userController.js');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile',verifyToken,updateProfile);
module.exports = router;
