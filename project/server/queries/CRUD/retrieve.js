import { query } from "../query";

export async function getClientInfo(username) {
  let text = "SELECT * FROM ClientInformation WHERE username=$1";
  let values = [username];

  try {
    let res = await query(text, values);
    return res;
  } catch (err) {
    throw err;
  }
}

export async function getFuelQuote(username) {
  let text = "SELECT * FROM FuelQuote WHERE username=$1";
  let values = [username];

  try {
    let res = await query(text, values);
    return res;
  } catch (err) {
    throw err;
  }
}
