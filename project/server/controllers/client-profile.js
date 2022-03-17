const Pricing = require("../models/pricing");

const get = require("../queries/CRUD/retrieve");
const update = require("../queries/CRUD/update");
const create = require("../queries/CRUD/create.js");


exports.postProfile = async (req, res, next) => {
  const username = req.headers.username;
  let data = [];
  try {
    data = (await get.getClientInfo(username)).rows();
    res.statusMessage = "Profile OK";
  } catch (err) {
    console.log(err.stack);
    res.statusMessage = "Error retrieving profile";
  }
  res.send(data);
};

exports.postUpdateProfile = (req, res, next) => {
  const username = req.headers.username;
  const fullName = req.body.fullName;
  const addr1 = req.body.addr1;
  const addr2 = req.body.addr2;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;

  let data = [];
  try {
    data = update.updateClientInfo(username, fullName, addr1, addr2, city, state, zip);
    res.statusMessage = "Profile Update OK";
  } catch (err) {
    console.log(err.stack);
    res.statusMessage = "Error updating profile";
  }

  res.send(data);
};

exports.postCreateProfile = (req, res, next) => {
  const username = req.headers.username;
  const fullName = req.body.fullName;
  const addr1 = req.body.addr1;
  const addr2 = req.body.addr2;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;

  let data = [];
  try {
    data = create.insertClientInfo(username, fullName, addr1, addr2, city, state, zip);
    res.statusMessage = "Profile Create OK";
  } catch (err) {
    console.log(err.stack);
    res.statusMessage = "Error creating profile";
  }

  res.send(data);
};
