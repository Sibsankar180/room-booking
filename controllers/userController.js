const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail ,updateUserProfile ,getUserProfile } = require("../models/userModel.js");

const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password');

    createUser(name, email, hashedPassword, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send('Email already exists');
        }
        return res.status(500).send('Database error');
      }
      res.status(201).send('User registered successfully');
    });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).send('Invalid email or password');
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(401).send('Invalid credentials');

      const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', {
        expiresIn: '1h',
      });

    

      res.json({ token });
        // add token into localStorage..
        // (( localStorage.setItem('token',token); )) // since , localStroge is part of browser , and this is backend , so we can't add this.
    });
  });
};


const updateProfile = (req,res) =>{
  
  const userId = req.user.id; // get user id from the jwt token

  const { name , email } = req.body;

  updateUserProfile(userId,{ name , email } , ( err,result) =>{
    if(err) return res.status(500).send("Porfile Update Failed!");

    res.status(200).send("Profile Update Successfully");
  });
};


const verifyToken = (req,res,next) => {

  const token = req.headers['authorization']?.split(' ')[1]; // 

  if(!token) return res.status(403).send('Token required');

  jwt.verify( token ,'your_jwt_secret', (err,decoded) =>{
    // jwt.verify() => verify token if it is right then , jwt gives user's info into "decoded ".
    if(err) return res.status(401).send("Invalid token");

    req.user = decoded; // store user'info in request, so that 'bookRoom' get this user properly.

    next();  // move next controller or middleware, here it is bookRoom, because in routes after 'verifyToken' , 'bookRoom' is used'. Without next(); request will hang forever.

  });

};

const getProfile = (req,res) =>{
  const userId = req.user.id;

  getUserProfile(userId,(err,results)=>{
    if(err || results.length === 0) return res.status(404).send("User not Exist!");

    res.json(results[0]);
  });
};

module.exports = { registerUser, loginUser , updateProfile ,verifyToken, getProfile};
