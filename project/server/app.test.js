//const supertest = require("supertest")
const app = require("./app.js")
const request = require("express")
const Axios = require('axios')
const initial_d = require('./queries/initialize/initialize.js')
const createManual = require('./queries/CRUD/create.js')
const Pricing = require("./models/pricing");
const misc = require("./helpers/login/misc.js")

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
  return Axios.post(
    "http://localhost:8080/login/register",
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
  return Axios.post(
    "http://localhost:8080/fuel/history",
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
const loginUserInfo = {
    username: "mooncoast_services",
    password: "luv2drill"
};

const testUserInfo = {
  username: "testUsername",
  password: "testPassword"
};

let createData = {
  fullName: "createdFN",
  addr1: "createdAddr1",
  addr2: "createdAddr2",
  city: "createdCity",
  state: "createdState",
  zip: 12345,
};

let updateData = {
  fullName: "updatedFN",
  addr1: "updatedAddr1",
  addr2: "updatedAddr2",
  city: "updatedCity",
  state: "updatedState",
  zip: 54321,
};

createdGs = 50
createdAddress = "159 Example Blvd"
createdDateReq = "2022-03-25"
createdDateDel = "2022-04-01"
createdP = 4.00
createdT = 200.00
let createQuoteData = {
  gallons: createdGs,
  addr: createdAddress,
  date_requested: createdDateReq,
  date_delivered: createdDateDel,
  price_per_gallon: createdP,
  total: createdT,
};


//Initialize the database before the tests
describe("Testing Database Initialization", () => {
  //Testing that the database initialization works properly.
  test("Testing Database Initialization", async () => {
    await initial_d.initialize_tables()
  })
})

describe("Testing Register", () => {
  //Testing that the register router is working and sends back a response.
  test("Testing Register: Should respond with status text 'Register OK'", async () => {
      const response = await registerUser(testUserInfo)
      expect(response.statusText).toBe("Register OK")
  })
})

describe("Testing Login", () => {
  //Testing that the login router is working and sends back a response.
  test("Testing Login: Should respond with status text 'Login OK'", async () => {
      const response = await loginUser(testUserInfo)
      expect(response.statusText).toBe("Login OK")
  })
})

describe("Testing postCreateProfile", () => {
  //testing that the postCreateProfile router is working and sends back a response.
  test("Testing postCreateProfile: Should respond with status text 'Profile Create OK'", async () => {
    const response = await createProfile(createData, testUserInfo)
    expect(response.statusText).toBe("Profile Create OK")
  })
})

describe("Testing postUpdateProfile", () => {
  //testing that the postUpdateProfile router is working and sends back a response.
  test("Testing postUpdateProfile: Should respond with status text 'Profile Update OK'", async () => {
    const response = await updateProfile(updateData, testUserInfo)
    expect(response.statusText).toBe("Profile Update OK")
  })
})

describe("Testing postProfile", () => {
  //testing that the postProfile router is working and sends back a response.
  test("Testing postProfile: Should respond with status text 'Profile OK'", async () => {
    const response = await getProfile(testUserInfo)
    expect(response.statusText).toBe("Profile OK")
  })
})

describe("Testing Create Quote", () => {
  //testing that the Create Quote router is working and sends back a response.
  test("Testing Create Quote: Should respond with status text 'Create Quote OK'", async () => {
    const response = await createQuote(createQuoteData, loginUserInfo)
    expect(response.statusText).toBe("Create Quote OK")
  })
})

describe("Testing Quote History", () => {
  //testing that the Quote History router is working and sends back a response.
  test("Testing Quote History: Should respond with status text 'Quote History OK'", async () => {
    const response = await getQuoteHistory(loginUserInfo)
    expect(response.statusText).toBe("Quote History OK")
  })
})

describe("Testing Pricing Module", () => {
  //testing that the Pricing Module returns expected values
  test("Testing Pricing Module: Should return ppg=1.70 and total_price=2,097.80", async () => {
    test_username = 'mooncoast_services'
    test_state = 'texas'
    test_gals = 1234
    pricing_output = await Pricing.calculate(test_username, test_state, test_gals)
    
    expect(pricing_output.suggested_ppg).toBe(1.7)
    expect(pricing_output.total).toBe(2097.8)
  })
})

describe("Testing miscellaneous helper functions", () => {
  //testing some of the misc helper functions
  test("Testing miscellaneous helper functions", async () => {
    test_username = 'mooncoast_services'
    test_password = 'wrong_password123'

    expect(await misc.check_password(test_username, test_password)).toBe(false)
  })
})