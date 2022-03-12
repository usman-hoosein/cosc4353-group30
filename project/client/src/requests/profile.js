import Axios from "axios";

//Fetching client info from database
export async function getProfile(login) {
  return Axios.post("/profile", {
    headers: { username: login.username },
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
}
//Sending data to back-end to update client info in the database
export async function updateProfile(data, login) {
  let creds = login;
  return Axios.post("/profile/update", data, {
    headers: { username: creds.username },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}

//Sending data to back-end to create client info in the database
export async function createProfile(data, login) {
  let creds = login;
  return Axios.post("/profile/create", data, {
    headers: { username: creds.username },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}
