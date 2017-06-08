var ObjectId = require('mongodb').ObjectId;
var userModel = require('../models/user')
var hash = require('object-hash');
var jwt = require('jsonwebtoken');

var getAll = function(req,res) {
  if (req.decoded == null) {
    res.send({msg: "Welcome, Please use /login and /signup to start"})
  } else {
    if (req.decoded.user !== null) {
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
}

var signup = function(req,res) {
  //Replace false value with req.body.admin to assign admin value from url form.
  userModel.create({
    username : req.body.username,
    email : req.body.email,
    password : hash(req.body.password),
    admin : false
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
       res.send({token: jwt.sign({id : result._id ,user : result.username, admin : result.admin},'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')})
     } else {
       res.send({msg : 'Username and password not match'})
       console.log(result.password);
       console.log(hash(req.body.password));
     }
   } else {
     res.send({msg : `Username ${req.body.username} not found `})
   }
 })
}

var deleteOne = function(req,res) {
  if (req.decoded.admin == true || req.decoded.id == req.params.id) {
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
    res.send({msg: 'You are not admin or authorized user'})
  }
}
//Update only for email attribute, add another attribute for your need
var updateOne = function(req,res) {
  if (req.decoded.admin == true || req.decoded.id == req.params.id) {
    userModel.findOne({
      _id : req.params.id
    }, function(err,result) {
      if (err) {
        res.send(err)
      } else {
        result.email = req.body.email || result.email
        result.save(function(err) {
          if (err) {
            res.send({msg: `Error with error message ${err}`})
          } else {
            res.send({msg: `Update email for user with id ${req.params.id} success`})
          }
        })
      }
    })
  } else {
    res.send({msg: 'You are not admin or authorized user'})
  }
}
module.exports = {
  signup,
  deleteOne,
  login,
  getAll,
  updateOne
};
