import { useRef } from "react";

import styles from "./Profile.module.css";

async function updateProfile() {
  //FIX THIS: Write function once backend is established.
  return;
}

function Profile(props) {
  const fullnameInputRef = useRef();
  const address1InputRef = useRef();
  const address2InputRef = useRef();
  const cityInputRef = useRef();
  const stateInputRef = useRef();
  const zipcodeInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredFullname = fullnameInputRef.current.value;

    const profileData = {
      fullname: enteredFullname
    };

    const token = await updateProfile(profileData);
    props.setToken("FIX THIS");
  };

  return <div>
    <h1>Profile Information</h1>
    
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          placeholder="John Example"
          ref={fullnameInputRef}
          required
        />
      </div>
      <div className={styles.control}>
        <label htmlFor="address1">Address 1</label>
        <input
          type="text"
          id="address1"
          placeholder="123 Main St"
          ref={address1InputRef}
          required
        />
      </div>
      <div className={styles.control}>
        <label htmlFor="address2">Address 2</label>
        <input
          type="text"
          id="address2"
          placeholder="Apt 111"
          ref={address2InputRef}
          required
        />
      </div>
      <div className={styles.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          placeholder="Houston"
          ref={cityInputRef}
          required
        />
      </div>
      <div className={styles.control}>
        <label htmlFor="state">State</label>
        <select
          id="state"
          ref={stateInputRef}
          required>
            <option value="none" selected disabled hidden>Select State</option>
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
      </div>
      <div className={styles.control}>
        <label htmlFor="zipcode">Zipcode</label>
        <input
          type="text"
          id="zipcode"
          placeholder="77077"
          ref={zipcodeInputRef}
        />
      </div>
      <div className={styles.actions}>
        <button>Save Changes</button>
      </div>
    </form>
    
  </div>;
}

export default Profile;
