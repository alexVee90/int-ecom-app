module.exports = (status, msg) => {
  const error = new Error();
  error.msg = msg;
  error.status = status;
  return error
}