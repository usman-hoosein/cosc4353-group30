const query = require("../query");

async function getClientInfo(username) {
  let text = "SELECT * FROM ClientInformation WHERE username=$1";
  let values = [username];

  try {
    let res = await query(text, values);
    return res;
  } catch (err) {
    throw err;
  }
}

async function getFuelQuote(username) {
  let text = "SELECT * FROM FuelQuote WHERE username=$1";
  let values = [username];

  try {
    let res = await query(text, values);
    return res;
  } catch (err) {
    throw err;
  }
}

module.exports = { getClientInfo: getClientInfo, getFuelQuote: getFuelQuote };
