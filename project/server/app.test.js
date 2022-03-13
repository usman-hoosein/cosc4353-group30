//const supertest = require("supertest")
const app = require("./app.js")
const request = require("express")
const Axios = require('axios')

async function loginUser(creds) {
    return Axios.post("http://localhost:8080/login", {}, {
      headers: {
        username: creds.username,
        password: creds.password,
      },
    })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("Login " + err);
      });
}

async function registerUser(creds) {
    return Axios.post("http://localhost:8080/login/register", {
      username: creds.username,
      password: creds.password,
    })
      .then((data) => {
        console.log("Register status: " + data.statusText);
        return data;
      })
      .catch((err) => {
        console.log("Register: " + err);
        return err;
      });
}

async function getProfile(login) {
  return Axios.post("http://localhost:8080/profile", {
    headers: { username: login.username },
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
}

async function updateProfile(data, login) {
  let creds = login;
  return Axios.post("http://localhost:8080/profile/update", data, {
    headers: { username: creds.username },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}

async function createProfile(data, login) {
  let creds = login;
  return Axios.post("http://localhost:8080/profile/create", data, {
    headers: { username: creds.username },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}

async function createQuote(data, login) {
  let creds = login;
  return Axios.post("http://localhost:8080/fuel/form ", data, {
    headers: { username: creds.username },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}

async function getQuoteHistory(login) {
  let creds = login;
  return Axios.get(
    "http://localhost:8080/fuel/history ",
    {},
    {
      headers: { username: creds.username },
    }
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}

//Dummy data for test
const userInfo = {
    username: "testUser",
    password: "testPass"
}

let updateData = {
  fullName: "enteredFN",
  addr1: "enteredAddr1",
  addr2: "enteredAddr2",
  city: "enteredCity",
  state: "enteredState",
  zip: "enteredZip",
};

describe("Testing Login", () => {
  //Testing that the login router is working and sends back a response.
  test("Testing Login: Should respond with status text 'Login OK'", async () => {
      const response = await loginUser(userInfo)
      expect(response.statusText).toBe("Login OK")
  })
})

describe("Testing Register", () => {
  //Testing that the register router is working and sends back a response.
  test("Testing Register: Should respond with status text 'Register OK'", async () => {
      const response = await registerUser(userInfo)
      expect(response.statusText).toBe("Register OK")
  })
})

describe("Testing postProfile", () => {
  //testing that the postProfile router is working and sends back a response.
  test("Testing postProfile: Should respond with status text 'Profile OK'", async () => {
    const response = await getProfile(userInfo)
    expect(response.statusText).toBe("Profile OK")
  })
})

describe("Testing postUpdateProfile", () => {
  //testing that the postUpdateProfile router is working and sends back a response.
  test("Testing postUpdateProfile: Should respond with status text 'Profile Update OK'", async () => {
    const response = await updateProfile(updateData, userInfo)
    expect(response.statusText).toBe("Profile Update OK")
  })
})

describe("Testing postCreateProfile", () => {
  //testing that the postCreateProfile router is working and sends back a response.
  test("Testing postCreateProfile: Should respond with status text 'Profile Create OK'", async () => {
    const response = await createProfile(updateData, userInfo)
    expect(response.statusText).toBe("Profile Create OK")
  })
})

describe("Testing Create Quote", () => {
  //testing that the Create Quote router is working and sends back a response.
  test("Testing Create Quote: Should respond with status text 'Create Quote OK'", async () => {
    const response = await createQuote(updateData, userInfo)
    expect(response.statusText).toBe("Create Quote OK")
  })
})

describe("Testing Quote History", () => {
  //testing that the Quote History router is working and sends back a response.
  test("Testing Quote History: Should respond with status text 'Quote History OK'", async () => {
    const response = await getQuoteHistory(userInfo)
    expect(response.statusText).toBe("Quote History OK")
  })
})
