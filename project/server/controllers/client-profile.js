const Pricing = require("../models/pricing");

exports.postProfile = (req, res, next) => {
  //TODO: Get client data from db to prefill profile form;
  // for now, sends dummy data
  const username = req.headers.username;
  const data = {
    fullName: "Spongebob Squarepants",
    addr1: "123 Conch St.",
    addr2: "",
    city: "Bikini Bottom",
    state: "TX",
    zip: 42069,
  };
  res.send(data);
};

exports.postUpdateProfile = (req, res, next) => {
  const username = req.headers.username;
  const data = {
    fullName: req.fullName,
    addr1: req.addr1,
    addr2: req.addr2,
    city: req.city,
    state: req.state,
    zip: req.zip,
  };
  //TODO: Update client's info in db; afterwards, send status of database query
  res.send(data);
};

exports.postCreateProfile = (req, res, next) => {
  const username = req.headers.username;
  const data = {
    fullName: req.fullName,
    addr1: req.addr1,
    addr2: req.addr2,
    city: req.city,
    state: req.state,
    zip: req.zip,
  };
  //TODO: Create client's info in db; afterwards, send status of database query
  res.send(data);
};
