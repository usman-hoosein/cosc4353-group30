import Axios from "axios";

//Sending data to back-end to create fuel quote
export async function createQuote(data, login) {
  return Axios.post("/fuel/form ", {
    username: login.username,
    ...data,
  })
    .then((res) => {
      console.log(res.statusText);
      return res;
    })
    .catch((err) => {
      console.log("Error" + err.stack);
      throw err;
    });
}
