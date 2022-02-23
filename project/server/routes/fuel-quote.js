const path = require('path');

const express = require('express');

const fuelController = require('../controllers/fuel-quote');

const router = express.Router();

// /fuel/history => GET
router.get('/history', fuelController.getFuelHistory); //Gets fuel quote history data from fb

// /fuel/form => POST
router.post('/form', fuelController.postFuelQuote); //Adds a fuel quote to the db from the quote form

module.exports = router;