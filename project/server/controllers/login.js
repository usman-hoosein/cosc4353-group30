const Pricing = require("../models/pricing");
const ep = require('../helpers/login/encrypt_pass.js');
const qry = require('../helpers/login/db_queries.js')
const vu = require('../helpers/login/valid_username')

exports.postLogin = async (req, res, next) => {
  const username = req.headers.username;
  const password = req.headers.password;

  check_user = await qry.user_exists(username);   //Check if the user exists in the database
  if (!check_user){
    console.log('User does not exist.')
    res.statusMessage = "Login failed"
    res.send({ message: "Not OK" })
  }
  else {
    check_pass = await qry.check_password(username, password);  //Check that the correct password was entered for the user.
    if (!check_pass){
      console.log('Wrong password.')
      res.statusMessage = "Login failed"
      res.send({ message: "Not OK" })
    }
    else {
      //User passes authentication
      console.log('Welcome')
      res.statusMessage = "Login OK"
      res.send({ message: "OK" });
    }
  }
};

exports.postRegister = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  check_user = await qry.user_exists(username);   //Check if the user already exists in the database
  if (check_user){
    console.log('Username already taken')
    res.statusMessage = "Registration failed"
    res.send({ message: "Not OK" })
  }
  else {
    //check if username is valid then create new entry in db
  }

  //FIXME: Make response send status message after db
  res.statusMessage = "Register OK"
  res.send({ message: "OK" });
};