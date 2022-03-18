import Axios from "axios";

export async function loginUser(creds) {
  return Axios.post(
    "/login",
    {},
    {
      headers: {
        username: creds.username,
        password: creds.password,
      },
    }
  )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("Login " + err);
    });
}

export async function registerUser(creds) {
  return Axios.post(
    "/login/register",
    {},
    {
      headers: {
        username: creds.username,
        password: creds.password,
      },
    }
  )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("Register: " + err);
      return err;
    });
}
