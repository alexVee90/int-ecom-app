const axios = require('axios');

//load the env vars
require('dotenv').config();

/*
 @desc POST /auth/signup  registers a user into the database
 @params takes in an object with name, email and password properties 
 @returns a user object with an obj property and a token property ex { user: { _id, name, email, password, secretKey, createdAt }, token: 'asdasd' }
*/

exports.signUp = async data => { 
  data.secretKey = process.env.SECRET_KEY;
  try {
    const response = await axios.post(`${process.env.DB_API}/auth/signup`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/*
 @desc POST /auth/signin  registers a user into the database
 @params takes in an object with email and password properties 
 @returns a user object with an obj property and a token property ex { user: { _id, name, email, password, secretKey, createdAt }, token: 'asdasd' }
*/

exports.signIn = async data => { 
  data.secretKey = process.env.SECRET_KEY;
  try {
    const response = await axios.post(`${process.env.DB_API}/auth/signin`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}