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

/*
 @desc POST /wishlist/addItem  adds an item to the wishlist
 @params the data which should be sent and the auth token
 @returns a wishlist object 
*/
exports.addToWishlist = async (data, token) => { 
  data.secretKey = process.env.SECRET_KEY;
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-type": "application/json"
  }
  try {
    const response = await axios.post(`${process.env.DB_API}/wishlist/addItem`, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/*
 @desc GET /wishlist?secretKey=<mysecretKey>  returns the wishlist
 @params  the auth token
 @returns a wishlist object 
*/
exports.getWishlistFromDB = async token => { 
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-type": "application/json"
  }
  try {
    const response = await axios.get(`${process.env.DB_API}/wishlist?secretKey=${process.env.SECRET_KEY}`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/*
 @desc DELETE /wishlist/removeItem Removes a product from the wishlist. If the wishlist has no more items after the product is removed, the wishlist is deleted 
 @params  data - obj / token - auth token (string)
 @returns an object - the wishlist with remainig products
*/
exports.deleteWishlistItem = async (data, token) => { 
  data.secretKey = process.env.SECRET_KEY;
  const url = `${process.env.DB_API}/wishlist/removeItem`;
  const headers = {
    "Authorization": `Bearer ${token}`
  }
  try {
    const response = await axios.delete(url, {data, headers})
    return response.data;
  } catch (error) {
    throw error;
  }
}


/*
 @desc POST /wishlist/changeItemQuantity  Changes de quantity of a product in the wishlist. If quantity is changed to 0, the product is removed from the wishlist. If it was the only product in the wishlist, the wishlist is deleted.​
 @params the data which should be sent and the auth token
 @returns a wishlist object 
*/
exports.changeWishlistItemQuantity = async (data, token) => {
  data.secretKey = process.env.SECRET_KEY;
  const url = `${process.env.DB_API}/wishlist/changeItemQuantity`;
  const headers = {
    "Authorization": `Bearer ${token}`
  }
  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}


/*
 @desc GET /cart?secretKey=<mysecretKey>  returns the wishlist
 @params  the auth token
 @returns a wishlist object 
*/
exports.getCartFromDB = async token => { 
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-type": "application/json"
  }
  try {
    const response = await axios.get(`${process.env.DB_API}/cart?secretKey=${process.env.SECRET_KEY}`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/*
 @desc POST /cart/addItem  adds an item to the wishlist
 @params the data which should be sent and the auth token
 @returns a cart object 
*/
exports.addToCart = async (data, token) => { 
  data.secretKey = process.env.SECRET_KEY;
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-type": "application/json"
  }
  try {
    const response = await axios.post(`${process.env.DB_API}/cart/addItem`, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/////////////////////////////////////////////////////////
/// I am not using this route, only implemented the code///
/////////////////////////////////////////////////////////
// /*
//  @desc DELETE /cart/removeItem Removes a product from the wishlist. If the wishlist has no more items after the product is removed, the wishlist is deleted 
//  @params  data - obj / token - auth token (string)
//  @returns an object - the cart with remainig products
// */
// exports.deleteCartItem = async (data, token) => { 
//   data.secretKey = process.env.SECRET_KEY;
//   const url = `${process.env.DB_API}/cart/removeItem`;
//   const headers = {
//     "Authorization": `Bearer ${token}`
//   }
//   try {
//     const response = await axios.delete(url, {data, headers})
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }
////////////////////////////////////////////////////////////

/*
 @desc POST /cart/changeItemQuantity  Changes de quantity of a product in the cart. If quantity is changed to 0, the product is removed from the cart. If it was the only product in the cart, the cart is deleted.​
 @params the data which should be sent and the auth token
 @returns a cart object 
*/
exports.changeCartItemQuantity = async (data, token) => {
  data.secretKey = process.env.SECRET_KEY;
  const url = `${process.env.DB_API}/cart/changeItemQuantity`;
  const headers = {
    "Authorization": `Bearer ${token}`
  }
  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}