
module.exports = (req, res, next) => {
  console.log(res);
  res.status(404).json({status:false, errorMessage:"Sorry, the requested route was not found!"});
};