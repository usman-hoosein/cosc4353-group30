import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Popup.module.css";

//FIX THIS: change address value from to whatever is in profile address
const Popup = (props) => {
  let navigate = useNavigate();
  function SubmitHandler(event) {
    event.preventDefault();
    navigate("/");
    props.handleClose();
  }
  return (
    <div className={styles.popup_box}>
      <div className={styles.box}>
        <span className={styles.close_icon} onClick={props.handleClose}>
          x
        </span>
        <form className={styles.form} onSubmit={SubmitHandler}>
          <div className={styles.control}>
            <label htmlFor="gallons">Gallons</label>
            <input type="number" id="gallons" required />
          </div>
          <div className={styles.control}>
            <label htmlFor="address">Delivery Address</label>
            <input type="text" id="address" value="*From Profile*" readOnly />
          </div>
          <div className={styles.control}>
            <label htmlFor="date">Delivery Date</label>
            <input type="date" id="date" />
          </div>
          <div className={styles.control}>
            <label htmlFor="suggested_ppg">Suggested Price / Gallon</label>
            <input type="number" id="suggested_ppg" readOnly />
          </div>
          <div className={styles.control}>
            <label htmlFor="total">Total Amount Due</label>
            <input type="number" id="total" readOnly />
          </div>
          <div className={styles.actions}>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
