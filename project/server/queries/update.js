import { query } from "./query";

export async function updateClientInfo(
  username,
  full_name,
  addr1,
  addr2,
  city,
  us_state,
  zipcode
) {
  let text =
    "UPDATE ClientInformation SET full_name=$1, addr1=$2, addr2=$3, city=$4, us_state=$5, zipcode=$6 " +
    "WHERE username=$7";
  let values = [full_name, addr1, addr2, city, us_state, zipcode, username];

  try {
    let res = await query(text, values);
    return res;
  } catch (err) {
    throw err;
  }
}
