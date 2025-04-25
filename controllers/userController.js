const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require("../models/userModel");

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
      res.json({ message: 'Login successful', token });
    });
  });
};

module.exports = { registerUser, loginUser };
