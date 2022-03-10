import { useContext, useRef, useState } from "react";

import { getProfile, updateProfile, createProfile } from "../requests/profile";
import styles from "./Profile.module.css";
import LoginContext from "../contexts/login";
import LoadingContext from "../contexts/loading";
import ProfileInfoContext from "../contexts/profile-info";

let exampleData = {
  fullName: "John Example",
  addr1: "123 Main St",
  addr2: "Apt 111",
  city: "Houston",
  state: "TX",
  zip: 77407,
};

let hasPrefill = false;

function Profile(props) {
  let LoginCtx = useContext(LoginContext);
  let LoadingCtx = useContext(LoadingContext);
  let ProfileInfoCtx = useContext(ProfileInfoContext);

  const [isDisplayProfilePage, setisDisplayProfilePage] = useState(true);

  const fullnameInputRef = useRef();
  const address1InputRef = useRef();
  const address2InputRef = useRef();
  const cityInputRef = useRef();
  const stateInputRef = useRef();
  const zipcodeInputRef = useRef();

  const switchProfilePage = () => {
    setisDisplayProfilePage(!isDisplayProfilePage); //Filter between profile display and form pages
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredFN = fullnameInputRef.current.value;
    const enteredAddr1 = address1InputRef.current.value;
    const enteredAddr2 = address2InputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredState = stateInputRef.current.value;
    const enteredZip = zipcodeInputRef.current.value;

    let dataFill = {
      fullName: enteredFN,
      addr1: enteredAddr1,
      addr2: enteredAddr2,
      city: enteredCity,
      state: enteredState,
      zip: enteredZip,
    };

    //Updating the database to change the client's info
    if (ProfileInfoContext.ProfileInfo !== false)
      updateProfile(dataFill, LoginCtx.Login)
        .then((data) => {
          if (data.statusText === "OK") {
            console.log("Updated profile in db");
            ProfileInfoCtx.updateProfileInfo(dataFill);
            LoadingCtx.finishedLoading();
            switchProfilePage();
          }
        })
        .catch((err) => console.log(err.stack));
    //If new client, create entry in database
    else
      createProfile(dataFill, LoginCtx.Login)
        .then((data) => {
          if (data.statusText === "OK") {
            console.log("Created profile in db");
            ProfileInfoCtx.updateProfileInfo(dataFill);
            LoadingCtx.finishedLoading();
            switchProfilePage();
          }
        })
        .catch((err) => console.log(err.stack));
    LoadingCtx.currentlyLoading();
  };

  //Retreiving the data from the db to prefill the form
  if (!ProfileInfoCtx.ProfileInfo) {
    (async () => {
      const profileInfo = await getProfile(LoginCtx.Login);
      let res = profileInfo.data;
      if (res != null) {
        console.log("Prefilling data...");
        hasPrefill = true;
        ProfileInfoCtx.updateProfileInfo({
          fullName: res.fullName,
          addr1: res.addr1,
          addr2: res.addr2,
          city: res.city,
          state: res.state,
          zip: res.zip,
        });
        LoadingCtx.finishedLoading();
      } else {
        console.log("No profile data in database");
        hasPrefill = false;
      }
    })().catch((err) => console.log(err.stack));
    LoadingCtx.currentlyLoading();
  }

  if (ProfileInfoCtx.ProfileInfo === false) hasPrefill = false;
  else hasPrefill = true;

  //The page to display user info and give an OPTION to EDIT the info; the display-page
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
              <div className={styles.info_data}>
                {ProfileInfoCtx.ProfileInfo.fullName}
              </div>
            </h2>
          </div>
          <h2>
            Address 1:
            <div className={styles.info_data}>
              {ProfileInfoCtx.ProfileInfo.addr1}
            </div>
          </h2>
          <h2>
            Address 2:
            <div className={styles.info_data}>
              {ProfileInfoCtx.ProfileInfo.addr2}
            </div>
          </h2>
          <h2>
            City:{" "}
            <div className={styles.info_data}>
              {ProfileInfoCtx.ProfileInfo.city}
            </div>
          </h2>
          <h2>
            State:{" "}
            <div className={styles.info_data}>
              {ProfileInfoCtx.ProfileInfo.state}
            </div>
          </h2>
          <h2>
            Zip Code:{" "}
            <div className={styles.info_data}>
              {ProfileInfoCtx.ProfileInfo.zip}
            </div>
          </h2>
        </div>
      </div>
    );
  }
  //The page to display a form to edit or create user data; the profile form page
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
                defaultValue={ProfileInfoCtx.ProfileInfo.fullName}
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
                defaultValue={ProfileInfoCtx.ProfileInfo.addr1}
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
                defaultValue={ProfileInfoCtx.ProfileInfo.addr2}
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
                defaultValue={ProfileInfoCtx.ProfileInfo.city}
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
                defaultValue={ProfileInfoCtx.ProfileInfo.state}
                required
              >
                <option defaultValue="none">Select State</option>
                <option defaultValue="AL">AL</option>
                <option defaultValue="AK">AK</option>
                <option defaultValue="AR">AR</option>
                <option defaultValue="AZ">AZ</option>
                <option defaultValue="CA">CA</option>
                <option defaultValue="CO">CO</option>
                <option defaultValue="CT">CT</option>
                <option defaultValue="DC">DC</option>
                <option defaultValue="DE">DE</option>
                <option defaultValue="FL">FL</option>
                <option defaultValue="GA">GA</option>
                <option defaultValue="HI">HI</option>
                <option defaultValue="IA">IA</option>
                <option defaultValue="ID">ID</option>
                <option defaultValue="IL">IL</option>
                <option defaultValue="IN">IN</option>
                <option defaultValue="KS">KS</option>
                <option defaultValue="KY">KY</option>
                <option defaultValue="LA">LA</option>
                <option defaultValue="MA">MA</option>
                <option defaultValue="MD">MD</option>
                <option defaultValue="ME">ME</option>
                <option defaultValue="MI">MI</option>
                <option defaultValue="MN">MN</option>
                <option defaultValue="MO">MO</option>
                <option defaultValue="MS">MS</option>
                <option defaultValue="MT">MT</option>
                <option defaultValue="NC">NC</option>
                <option defaultValue="NE">NE</option>
                <option defaultValue="NH">NH</option>
                <option defaultValue="NJ">NJ</option>
                <option defaultValue="NM">NM</option>
                <option defaultValue="NV">NV</option>
                <option defaultValue="NY">NY</option>
                <option defaultValue="ND">ND</option>
                <option defaultValue="OH">OH</option>
                <option defaultValue="OK">OK</option>
                <option defaultValue="OR">OR</option>
                <option defaultValue="PA">PA</option>
                <option defaultValue="RI">RI</option>
                <option defaultValue="SC">SC</option>
                <option defaultValue="SD">SD</option>
                <option defaultValue="TN">TN</option>
                <option defaultValue="TX">TX</option>
                <option defaultValue="UT">UT</option>
                <option defaultValue="VT">VT</option>
                <option defaultValue="VA">VA</option>
                <option defaultValue="WA">WA</option>
                <option defaultValue="WI">WI</option>
                <option defaultValue="WV">WV</option>
                <option defaultValue="WY">WY</option>
              </select>
            ) : (
              <select
                id="state"
                ref={stateInputRef}
                placeholder={exampleData.state}
                required
              >
                <option defaultValue="none">Select State</option>
                <option defaultValue="AL">AL</option>
                <option defaultValue="AK">AK</option>
                <option defaultValue="AR">AR</option>
                <option defaultValue="AZ">AZ</option>
                <option defaultValue="CA">CA</option>
                <option defaultValue="CO">CO</option>
                <option defaultValue="CT">CT</option>
                <option defaultValue="DC">DC</option>
                <option defaultValue="DE">DE</option>
                <option defaultValue="FL">FL</option>
                <option defaultValue="GA">GA</option>
                <option defaultValue="HI">HI</option>
                <option defaultValue="IA">IA</option>
                <option defaultValue="ID">ID</option>
                <option defaultValue="IL">IL</option>
                <option defaultValue="IN">IN</option>
                <option defaultValue="KS">KS</option>
                <option defaultValue="KY">KY</option>
                <option defaultValue="LA">LA</option>
                <option defaultValue="MA">MA</option>
                <option defaultValue="MD">MD</option>
                <option defaultValue="ME">ME</option>
                <option defaultValue="MI">MI</option>
                <option defaultValue="MN">MN</option>
                <option defaultValue="MO">MO</option>
                <option defaultValue="MS">MS</option>
                <option defaultValue="MT">MT</option>
                <option defaultValue="NC">NC</option>
                <option defaultValue="NE">NE</option>
                <option defaultValue="NH">NH</option>
                <option defaultValue="NJ">NJ</option>
                <option defaultValue="NM">NM</option>
                <option defaultValue="NV">NV</option>
                <option defaultValue="NY">NY</option>
                <option defaultValue="ND">ND</option>
                <option defaultValue="OH">OH</option>
                <option defaultValue="OK">OK</option>
                <option defaultValue="OR">OR</option>
                <option defaultValue="PA">PA</option>
                <option defaultValue="RI">RI</option>
                <option defaultValue="SC">SC</option>
                <option defaultValue="SD">SD</option>
                <option defaultValue="TN">TN</option>
                <option defaultValue="TX">TX</option>
                <option defaultValue="UT">UT</option>
                <option defaultValue="VT">VT</option>
                <option defaultValue="VA">VA</option>
                <option defaultValue="WA">WA</option>
                <option defaultValue="WI">WI</option>
                <option defaultValue="WV">WV</option>
                <option defaultValue="WY">WY</option>
              </select>
            )}
          </div>
          <div className={styles.control}>
            <label htmlFor="zipcode">Zipcode</label>
            {hasPrefill ? (
              <input
                type="number"
                id="zipcode"
                defaultValue={ProfileInfoCtx.ProfileInfo.zip}
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
