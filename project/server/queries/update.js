import { query } from "./query";

//Pass an array of columns to be updated and their corresponding new values as the 2nd
// and third arguements (i.e. cols and newVals)
export async function updateClientInfo(username, cols = [], newVals = []) {
  let text = "UPDATE ClientInformation SET ";
  let values = [...newVals, username];

  for (let i = 0; i < cols.length(); i++) {
    if (i == 0) text += cols[i] + "=$" + (i + 1);
    else text += ", " + cols[i] + "=$" + (i + 1);
  }

  text += " WHERE username=$" + (cols.length() + 1);

  query(text, values)
    .then((res) => {})
    .catch((err) => {
      console.log(err.stack);
    });
}
