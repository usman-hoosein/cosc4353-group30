const Pricing = require("../models/pricing");

const get = require("../queries/CRUD/retrieve");
const update = require("../queries/CRUD/update");
const create = require("../queries/CRUD/create.js");

exports.postProfile = async (req, res, next) => {
  const username = req.headers.username;
  let data = [];
  try {
    data = await get.getClientInfo(username);
    res.statusMessage = "Profile OK";
  } catch (err) {
    console.log(err.stack);
    res.statusMessage = "Error retrieving profile";
  }
  res.send(data);
};

exports.postUpdateProfile = async (req, res, next) => {
  const username = req.headers.username;
  const fullName = req.body.fullName;
  const addr1 = req.body.addr1;
  const addr2 = req.body.addr2;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;

  let data = [];

  // Checking if form fields are of the proper type
  if (
    isNaN(zip) ||
    fullName.length > 50 ||
    fullName.length === 0 ||
    addr1.length > 100 ||
    addr1.length === 0 ||
    addr2.length > 100 ||
    city.length > 100 ||
    city.length === 0 ||
    state.length === 0 ||
    zip.length > 9 ||
    zip.length < 5 ||
    zip.length === 0
  ) {
    console.log("INVALID FORM FORMATTING");
    res.statusMessage = "Invalid formatting";
    res.status(400).send(data);
  } else {
    try {
      data = await update.updateClientInfo(
        username,
        fullName,
        addr1,
        addr2,
        city,
        state,
        zip
      );
      res.statusMessage = "Profile Update OK";
    } catch (err) {
      console.log(err.stack);
      res.statusMessage = "Error updating profile";
    }

    res.send(data);
  }
};

exports.postCreateProfile = async (req, res, next) => {
  const username = req.headers.username;
  const fullName = req.body.fullName;
  const addr1 = req.body.addr1;
  const addr2 = req.body.addr2;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;

  // Checking if form fields are of the proper type
  if (
    isNaN(zip) ||
    fullName.length > 50 ||
    fullName.length === 0 ||
    addr1.length > 100 ||
    addr1.length === 0 ||
    addr2.length > 100 ||
    city.length > 100 ||
    city.length === 0 ||
    state.length === 0 ||
    zip.length > 9 ||
    zip.length < 5 ||
    zip.length === 0
  ) {
    console.log("INVALID FORM FORMATTING");
    res.statusMessage = "Invalid formatting";
    res.status(400).send(data);
  } else {
    let data = [];
    try {
      data = await create.insertClientInfo(
        username,
        fullName,
        addr1,
        addr2,
        city,
        state,
        zip
      );
      res.statusMessage = "Profile Create OK";
    } catch (err) {
      console.log(err.stack);
      res.statusMessage = "Error creating profile";
    }

    res.send(data);
  }
};
