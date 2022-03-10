import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";

import FuelQuoteHistoryContext from "../../contexts/fuel-quote-history";
import ProfileInfoContext from "../../contexts/profile-info";
import LoginContext from "../../contexts/login";
import LoadingContext from "../../contexts/loading";
import styles from "./Popup.module.css";
import { createQuote } from "../../requests/fuel-quote-history";

const Popup = (props) => {
  const HistoryCtx = useContext(FuelQuoteHistoryContext);
  const ProfileCtx = useContext(ProfileInfoContext);
  const LoginCtx = useContext(LoginContext);
  const LoadingCtx = useContext(LoadingContext);

  let navigate = useNavigate();

  const gallonsInputRef = useRef();
  const dateInputRef = useRef();
  const priceInputRef = useRef();
  const totalInputRef = useRef();

  const address = ProfileCtx.ProfileInfo.addr1;

  function SubmitHandler(event) {
    event.preventDefault();

    const enteredGs = gallonsInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const enteredP = priceInputRef.current.value;
    const enteredT = totalInputRef.current.value;

    let info = [
      enteredGs,
      address,
      enteredDate,
      enteredP,
      enteredT,
    ];

    createQuote(info, LoginCtx.Login)
      .then((res) => {
        HistoryCtx.addFuelQuoteHistory(info);
        LoadingCtx.finishedLoading();
        navigate("/");
        props.handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
    LoadingCtx.currentlyLoading();
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
            <input type="number" id="gallons" ref={gallonsInputRef} required />
          </div>
          <div className={styles.control}>
            <label htmlFor="address">Delivery Address</label>
            <input type="text" id="address" value={address} readOnly />
          </div>
          <div className={styles.control}>
            <label htmlFor="date">Delivery Date</label>
            <input type="date" id="date" ref={dateInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="suggested_ppg">Suggested Price / Gallon</label>
            <input
              type="number"
              id="suggested_ppg"
              ref={priceInputRef}
              readOnly
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="total">Total Amount Due</label>
            <input type="number" id="total" ref={totalInputRef} readOnly />
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
