const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dynamoDB = require('../config/awsConfig');
const { v4: uuidv4 } = require('uuid');

exports.registerUser = async (req, res, next) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    const newUser = new User( id, username, hashedPassword, email);
    
    const params = {
        TableName: process.env.DYNAMODB_USER_TABLE,
        Item: newUser.toJson()
    };
    await dynamoDB.put(params, (error, result) => {
        if (error) {
        res.status(500).send({ error: "Could not create user" });
        } else {
        res.status(201).send({ id, username, email });
        }
    });
};

exports.loginUser = async (req, res) => {
    const jwtSecretKey =  process.env.JWT_SECRET;
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
  
    const params = {
      TableName: process.env.DYNAMODB_USER_TABLE,
      Key: {
        email: email,
      },
    };
    
    try {
      const { Item: user } = await dynamoDB.get(params).promise();
      
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      if (!user.password) {
        console.error('Password not found for user:', email);
        return res.status(500).send('Authentication error');
      }
  
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send('Invalid Password');
      }
  
      const token = jwt.sign({ email: user.email }, jwtSecretKey, {
        expiresIn: 86400, // expira en 24 horas
      });
  
      res.status(200).send({ auth: true, token });
    } catch (error) {
      console.error('Login error', error);
      res.status(500).send('Error on login');
    }
  };
