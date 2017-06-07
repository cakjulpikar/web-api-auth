var ObjectId = require('mongodb').ObjectId;
var userModel = require('../models/user')
var hash = require('object-hash');
var jwt = require('jsonwebtoken');

var homepage = function(req,res) {
  res.send({msg: "Welcome, Please use /login and /signup to start"})
}

var getAll = function(req,res) {
  var decoded = jwt.verify(req.headers.token,'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  if (decoded.admin !== null) {
    userModel.find({},
    function (err,result) {
     if (err) {
       res.send(err)
     } else {
       res.send(result)
     }
    })
  } else {
    res.send({msg: 'Token error'})
  }
}

var signup = function(req,res) {
  userModel.create({
    username : req.body.username,
    email : req.body.email,
    password : hash(req.body.password),
    admin : req.body.admin
  },function(err,result) {
      if (err) {
        res.send(err)
      } else {
        res.send(result)
      }
  })
}

var login = function (req,res) {
  userModel.findOne({
   username : req.body.username
 },function(err,result) {
   if (result) {
     if (result.password == hash(req.body.password)) {
       res.send({token: jwt.sign({user : result.username, admin : result.admin},'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')})
     } else {
       res.send({msg : 'Username and password not match'})
     }
   } else {
     res.send({msg : `Username ${req.body.username} not found `})
   }
 })
}

var deleteOne = function(req,res) {
  var decoded = jwt.verify(req.headers.token,'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  if (decoded.admin === true) {
    userModel.deleteOne({
      _id : ObjectId(req.params.id)
    },function(err) {
      if (err) {
        res.send(err)
      } else {
        res.send({msg: `Delete account with id ${req.params.id} success`})
      }
    })
  } else {
    res.send({msg 'You are not admin'})
  }
}

module.exports = {
  homepage,
  signup,
  deleteOne,
  login,
  getAll
};
