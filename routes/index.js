var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/userControllers')

// Informational Homepage
router.get('/', userControllers.homepage);

//Get all user
router.post('/', userControllers.getAll)

//Sign-up
router.post('/signup', userControllers.signup)

//Login, return token
router.post('/login',userControllers.login)

//Delete
router.delete('/:id', userControllers.deleteOne)


module.exports = router;
