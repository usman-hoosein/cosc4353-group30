const path = require('path');

const express = require('express');

const profileController = require('../controllers/client-profile');

const router = express.Router();

// /profile => GET
router.get('/', profileController.getProfile); //Prefills the form with previous-user data

// /profile => POST
router.post('/', profileController.postProfile); //Updates the user-data in db with data from the form

module.exports = router;