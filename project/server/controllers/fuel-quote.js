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
  const Gallons = req.body.gallons_requested;
  const date = req.body.date_requested;
  const price = req.body.price_per_gallon;
  const total = req.body.total_paid;
  const address = req.body.date_delivered;

  console.log(
    "Username: " +
      username +
      "; Gallons: " +
      Gallons +
      "; Date: " +
      date +
      "; Price:" +
      price +
      "; Total: " +
      total +
      "; Address " +
      address
  );

  let data = [];
  // try {
  //     data = create.insertFuelQuote(
  //         username,
  //         date,
  //         address,
  //         Gallons,
  //         price,
  //         total
  //     );
  //     res.statusMessage = "Quote Update OK";
  // } catch (err) {
  //     console.log(err.stack);
  //     res.statusMessage = "Error updating Quote";
  // }
  // quoteHistory.push(data);
  res.statusMessage = "Create Quote OK";
  res.send(data); //Returns status of updating the db
};
