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

const retrieve = require("../queries/CRUD/retrieve");
const update = require("../queries/CRUD/update");
const create = require("../queries/CRUD/create.js");

// //Temperorary array to hold the fuel quote history
// //TODO:Delete after db is made
// var quoteHistory = [];

exports.postFuelHistory = async (req, res, next) => {
  const username = req.headers.username;
  let data = [];

  try {
    data = await retrieve.getFuelQuote(username);
    res.statusMessage = "FuelQuote Gotten";
  } catch (err) {
    console.log(err.stack);
    res.statusMessage = "Error: Retrieving FuelQuote";
  }
  res.statusMessage = "Quote History OK";
  res.send(data);
  // res.send(quoteHistory); //Send an array of json objects
};

exports.postFuelQuote = async (req, res, next) => {
  const username = req.headers.username;

  const Gallons = req.body.gallons;
  const date_req = req.body.date_requested;
  const date_del = req.body.date_delivered;
  const price = req.body.price_per_gallon;
  const total = req.body.total;
  const address = req.body.addr;

  let data = [];

  // Checking if form fields are of the proper type
  if (
    isNaN(Gallons) ||
    isNaN(price) ||
    isNaN(total) ||
    date_req === null ||
    date_req.length === 0 ||
    Gallons.length === 0 ||
    price.length === 0 ||
    total.length === 0
  ) {
    console.log("INVALID FORM FORMATTING");
    res.statusMessage = "Invalid formatting";
    res.status(400).send(data);
  } else {
    try {
      data = create.insertFuelQuote(
        username,
        date_req,
        date_del,
        address,
        Gallons,
        price,
        total
      );
      res.statusMessage = "Quote Update OK";
    } catch (err) {
      console.log(err.stack);
      res.statusMessage = "Error updating Quote";
    }
    //quoteHistory.push(data);
    res.statusMessage = "Create Quote OK";
    res.send(data); //Returns status of updating the db
  }
};

exports.postPrice = async (req, res, next) => {
  const username = req.headers.username;

  const addr = req.body.addr;
  const gals = req.body.gals;

  const addrSplit = addr.split(", ");
  const state = addrSplit[2];

  let ret = await Pricing.calculate(username, state, gals);

  res.statusMessage = "Get Price OK";
  res.send(ret);
};
