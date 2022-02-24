const path = require('path');

const express = require('express');

const profileController = require('../controllers/client-profile');

const router = express.Router();

// /profile => GET
router.get('/', profileController.getProfile); //Prefills the form with previous-user data

// /profile/update => POST
router.post('/update', profileController.postUpdateProfile); //Updates the user-data in db with data from the form

// /profile/create => POST
router.post('/create', profileController.postCreateProfile); //Creates the user-data in db with data from the form

module.exports = router;