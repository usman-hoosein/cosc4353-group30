/*
 *  retrieve.getFuelQuote(username): Retrieves the fuel quote history for that user
 *  create.insertFuelQuote(username,
  date_requested,
  date_delivered,
  gallons_requested,
  price_per_gallon,
  total_paid): Adds a new fuel quote, with the arguements as the column values, to the db for that user
 */

const Pricing = require("../models/pricing");

const retieve = require("../queries/CRUD/retrieve");
const update = require("../queries/CRUD/update");
const create = require("../queries/CRUD/create.js");

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
