const Pricing = require("../models/pricing");

exports.postProfile = (req, res, next) => {
  //TODO: Get client data to prefill profile form
  const username = req.body.username;
};

exports.postUpdateProfile = (req, res, next) => {
  //TODO: Update client's info in db
  const username = req.body.username;
};

exports.postCreateProfile = (req, res, next) => {
  //TODO: Create client's profle in db
  const username = req.body.username;
};
