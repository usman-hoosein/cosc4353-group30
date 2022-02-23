const path = require('path');

const express = require('express');

const loginController = require('../controllers/login');

const router = express.Router();

// /login => POST
router.post('/', loginController.postLogin); //Logs the user into the website

// /login/register => POST
router.post('/register', loginController.postRegister); //Registers an account with the db

module.exports = router;
