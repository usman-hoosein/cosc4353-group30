import Axios from "axios";

//Fetching client info from database
export async function getProfile(login) {
  return Axios.post("/profile", {
    username: login.username,
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
  return Axios.post("/profile/update", {
    username: login.username,
    ...data,
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
  return Axios.post("/profile/create", {
    username: login.username,
    ...data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}
