const query = require("../query");

async function insertUserCreds(username, password) {
  let text = "INSERT INTO UserCredentials(username, pass) VALUES ($1, $2);";
  let values = [username, password];

  try {
    let res = await query(text, values);
    return res;
  } catch (err) {
    throw err;
  }
}

async function insertClientInfo(
  username,
  full_name,
  addr1,
  addr2,
  city,
  state,
  zip
) {
  let text =
    "INSERT INTO ClientInformation(username, full_name, addr1, addr2, city, us_state, zipcode) " +
    "VALUES ($1, $2, $3, $4, $5, $6, $7);";
  let values = [username, full_name, addr1, addr2, city, state, zip];

  try {
    let res = await query(text, values);
    return res;
  } catch (err) {
    throw err;
  }
}

async function insertFuelQuote(
  username,
  date_requested,
  date_delivered,
  gallons_requested,
  price_per_gallon,
  total_paid
) {
  let text =
    "INSERT INTO FuelQuote(username, date_requested, date_delivered, gallons_requested, price_per_gallon, total_paid) " +
    "VALUES ($1, $2, $3, $4, $5, $6);";
  let values = [
    username,
    date_requested,
    date_delivered,
    gallons_requested,
    price_per_gallon,
    total_paid,
  ];

  try {
    let res = await query(text, values);
    return res;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  insertClientInfo: insertClientInfo,
  insertFuelQuote: insertFuelQuote,
  insertUserCreds: insertUserCreds,
};
