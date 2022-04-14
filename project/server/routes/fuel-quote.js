const path = require('path');

const express = require('express');

const fuelController = require('../controllers/fuel-quote');

const router = express.Router();

// /fuel/history => POST
router.post('/history', fuelController.postFuelHistory); //Gets fuel quote history data from fb

// /fuel/form => POST
router.post('/form', fuelController.postFuelQuote); //Adds a fuel quote to the db from the quote form

// /fuel/price => POST
router.post('/price', fuelController.postPrice); //Adds a fuel quote to the db from the quote form

module.exports = router;