/*
  @desc wraps async code, permitting us to avoit retyping the trycatch block
  @return the asynchronous operation of the handler function
*/

module.exports = (handler) => async (req, res, next) => {
  try {
    await handler(req, res);
  } catch (error) {
    next(error);
    return error;
  }
}