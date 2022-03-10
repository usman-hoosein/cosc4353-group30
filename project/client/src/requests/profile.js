import Axios from "axios";

//Fetching client info from database
export async function getProfile(login) {
  return Axios.post("/profile", {
    username: login.username,
  })
    .then((data) => {
      console.log("Get Profile status: " + data.statusText);
      return data;
    })
    .catch((err) => {
      console.log("Get Profile " + err);
      return err;
    });
}
//Sending data to back-end to update client info in the database
export async function updateProfile(data, login) {
  let mainData = {
    fullName: data.fullName,
    addr1: data.addr1,
    addr2: data.addr2,
    city: data.city,
    state: data.state,
    zip: data.zip,
  };
  Axios.post("/profile/update", {
    username: login.username,
    ...mainData,
  })
    .then((res) => {
      console.log("Update Profile status: " + res.statusText);
      Object.assign(profileData, mainData);
      return res;
    })
    .catch((err) => {
      console.log("Update Profile " + err);
    });
}

//Sending data to back-end to create client info in the database
export async function createProfile(data, login) {
  let mainData = {
    fullName: data.fullName,
    addr1: data.addr1,
    addr2: data.addr2,
    city: data.city,
    state: data.state,
    zip: data.zip,
  };
  Axios.post("/profile/create", {
    username: login.username,
    ...mainData,
  })
    .then((res) => {
      console.log("Create Profile status: " + res.statusText);
      Object.assign(profileData, mainData);
      return res;
    })
    .catch((err) => {
      console.log("Create Profile " + err);
    });
}
