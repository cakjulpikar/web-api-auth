var jwt = require('jsonwebtoken')

var verifyUser = function(req,res,next) {
  if (req.headers.token == null) {
    req.decoded = null
    next()
  } else {
    req.decoded = jwt.verify(req.headers.token,'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
    next()
  }
}

module.exports = {
  verifyUser
};
