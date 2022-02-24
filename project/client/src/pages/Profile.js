import { useRef, useState } from "react";
import Axios from "axios";

import styles from "./Profile.module.css";

let profileData = {
  fullName: "",
  addr1: "",
  addr2: "",
  city: "",
  state: "",
  zip: null,
};

let exampleData = {
  fullName: "John Example",
  addr1: "123 Main St",
  addr2: "Apt 111",
  city: "Houston",
  state: "TX",
  zip: 77407,
};

let hasPrefill = false;

//Fetching client info from database
async function getProfile() {
  return Axios.get("/profile")
    .then((data) => {
      console.log("Update Profile status: " + data.statusText);
      return data;
    })
    .catch((err) => {
      console.log("Update Profile " + err);
      return err;
    });
}

//Sending data to back-end to update client info in the database
async function updateProfile(data) {
  Axios.post("/profile/update", {
    fullName: data.fullName,
    addr1: data.addr1,
    addr2: data.addr2,
    city: data.city,
    state: data.state,
    zip: data.zip,
  })
    .then((res) => {
      console.log("Update Profile status: " + res.statusText);
      return res;
    })
    .catch((err) => {
      console.log("Update Profile " + err);
    });
}

//Sending data to back-end to create client info in the database
async function createProfile(data) {
  Axios.post("/profile/create", {
    fullName: data.fullName,
    addr1: data.addr1,
    addr2: data.addr2,
    city: data.city,
    state: data.state,
    zip: data.zip,
  })
    .then((res) => {
      console.log("Create Profile status: " + res.statusText);
      return res;
    })
    .catch((err) => {
      console.log("Create Profile " + err);
    });
}

function Profile(props) {
  const [isDisplayProfilePage, setisDisplayProfilePage] = useState(false);

  const fullnameInputRef = useRef();
  const address1InputRef = useRef();
  const address2InputRef = useRef();
  const cityInputRef = useRef();
  const stateInputRef = useRef();
  const zipcodeInputRef = useRef();

  const switchProfilePage = () => {
    if (!isDisplayProfilePage) {
      //TODO: Update this so that hasPrefill state doesn't stay on the browser
      hasPrefill = true; //permanentely sets the hasPrefill state to true since the client now has data to prefill form
    }
    setisDisplayProfilePage(!isDisplayProfilePage); //Filter between profile display and form pages
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    Object.assign(profileData, {
      fullName: fullnameInputRef.current.value,
      addr1: address1InputRef.current.value,
      addr2: address2InputRef.current.value,
      city: cityInputRef.current.value,
      state: stateInputRef.current.value,
      zip: zipcodeInputRef.current.value,
    });

    //Updating the database to change the client's info
    if (hasPrefill) {
      await updateProfile(profileData);
    }
    //If new client, create entry in database
    else {
      await createProfile(profileData);
    }

    switchProfilePage();
  };

  if (!hasPrefill) {
    (async () => {
      const profileInfo = await getProfile();
      if (profileInfo.data != null) {
        hasPrefill = true;
        Object.assign(profileData, {
          fullName: profileInfo.data.fullName,
          addr1: profileInfo.data.addr1,
          addr2: profileInfo.data.addr2,
          city: profileInfo.data.city,
          state: profileInfo.data.state,
          zip: profileInfo.data.zip,
        });
      } else {
        hasPrefill = false;
      }
    })().catch((err) => console.log(err.stack));
  }

  //The page to display user info and give an option to EDIT the info; the display-page
  if (isDisplayProfilePage) {
    return (
      <div>
        <h1>Profile Information</h1>
        <button onClick={switchProfilePage} className={styles.button_form}>
          Edit Profile
        </button>
        <div className={styles.info}>
          <div className={styles.info_container}>
            <h2>
              Full Name:
              <div className={styles.info_data}>{profileData.fullName}</div>
            </h2>
          </div>
          <h2>
            Address 1:
            <div className={styles.info_data}>{profileData.addr1}</div>
          </h2>
          <h2>
            Address 2:
            <div className={styles.info_data}>{profileData.addr2}</div>
          </h2>
          <h2>
            City: <div className={styles.info_data}>{profileData.city}</div>
          </h2>
          <h2>
            State: <div className={styles.info_data}>{profileData.state}</div>
          </h2>
          <h2>
            Zip Code: <div className={styles.info_data}>{profileData.zip}</div>
          </h2>
        </div>
      </div>
    );
  }
  //The Page to display a form to edit or create user data; the profile form page
  else if (!isDisplayProfilePage) {
    return (
      <div>
        <h1>Profile Information</h1>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor="fullname">Full Name</label>
            {hasPrefill ? (
              <input
                type="text"
                id="fullname"
                value={profileData.fullName}
                ref={fullnameInputRef}
                required
              />
            ) : (
              <input
                type="text"
                id="fullname"
                placeholder={exampleData.fullName}
                ref={fullnameInputRef}
                required
              />
            )}
          </div>
          <div className={styles.control}>
            <label htmlFor="address1">Address 1</label>
            {hasPrefill ? (
              <input
                type="text"
                id="address1"
                value={profileData.addr1}
                ref={address1InputRef}
                required
              />
            ) : (
              <input
                type="text"
                id="address1"
                placeholder={exampleData.addr1}
                ref={address1InputRef}
                required
              />
            )}
          </div>
          <div className={styles.control}>
            <label htmlFor="address2">Address 2</label>
            {hasPrefill ? (
              <input
                type="text"
                id="address2"
                value={profileData.addr2}
                ref={address2InputRef}
              />
            ) : (
              <input
                type="text"
                id="address2"
                placeholder={exampleData.addr2}
                ref={address2InputRef}
              />
            )}
          </div>
          <div className={styles.control}>
            <label htmlFor="city">City</label>
            {hasPrefill ? (
              <input
                type="text"
                id="city"
                value={profileData.city}
                ref={cityInputRef}
                required
              />
            ) : (
              <input
                type="text"
                id="city"
                placeholder={exampleData.city}
                ref={cityInputRef}
                required
              />
            )}
          </div>
          <div className={styles.control}>
            <label htmlFor="state">State</label>
            {hasPrefill ? (
              <select
                id="state"
                ref={stateInputRef}
                value={profileData.state}
                required
              >
                <option value="none" selected disabled hidden>
                  Select State
                </option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AR">AR</option>
                <option value="AZ">AZ</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DC">DC</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="IA">IA</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="MA">MA</option>
                <option value="MD">MD</option>
                <option value="ME">ME</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MO">MO</option>
                <option value="MS">MS</option>
                <option value="MT">MT</option>
                <option value="NC">NC</option>
                <option value="NE">NE</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NV">NV</option>
                <option value="NY">NY</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WI">WI</option>
                <option value="WV">WV</option>
                <option value="WY">WY</option>
              </select>
            ) : (
              <select
                id="state"
                ref={stateInputRef}
                placeholder={exampleData.state}
                required
              >
                <option value="none" selected disabled hidden>
                  Select State
                </option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AR">AR</option>
                <option value="AZ">AZ</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DC">DC</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="IA">IA</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="MA">MA</option>
                <option value="MD">MD</option>
                <option value="ME">ME</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MO">MO</option>
                <option value="MS">MS</option>
                <option value="MT">MT</option>
                <option value="NC">NC</option>
                <option value="NE">NE</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NV">NV</option>
                <option value="NY">NY</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WI">WI</option>
                <option value="WV">WV</option>
                <option value="WY">WY</option>
              </select>
            )}
          </div>
          <div className={styles.control}>
            <label htmlFor="zipcode">Zipcode</label>
            {hasPrefill ? (
              <input
                type="number"
                id="zipcode"
                value={profileData.zip}
                ref={zipcodeInputRef}
                required
              />
            ) : (
              <input
                type="number"
                id="zipcode"
                placeholder={exampleData.zip}
                ref={zipcodeInputRef}
                required
              />
            )}
          </div>
          <div className={styles.actions}>
            <button>Save Changes</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Profile;
