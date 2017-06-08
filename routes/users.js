var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/userControllers')
var verifyToken = require('../helpers/verifyToken')

//Get all user
router.get('/', verifyToken.verifyUser ,userControllers.getAll)

//Sign-up
router.post('/signup',userControllers.signup)

//Login, return token
router.post('/login',userControllers.login)

//Delete
router.delete('/:id', verifyToken.verifyUser, userControllers.deleteOne)

//Update email
router.patch('/:id', verifyToken.verifyUser, userControllers.updateOne)
module.exports = router;
