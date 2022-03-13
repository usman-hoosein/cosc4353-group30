const Pricing = require("../models/pricing");

//Temperorary array to hold the fuel quote history
//TODO:Delete after db is made
var quoteHistory = [];

exports.getFuelHistory = (req, res, next) => {
  //TODO: Get Fuel Quote History from database
  //FIXME: Change from sending temporary data (quoteHistory variable) to db data
  res.statusMessage = "Quote History OK"
  res.send(quoteHistory); //Send an array of json objects
};

exports.postFuelQuote = (req, res, next) => {
  //TODO: Add Fuel Quote form to db, when db is working
  //FIXME: Change from updating the temporary data (quoteHistory variable) to db data
  const data = req.body;
  quoteHistory.push(data);
  res.statusMessage = "Create Quote OK"
  res.send(data); //Returns status of updating the db
};
