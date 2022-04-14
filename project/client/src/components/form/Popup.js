import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useEffect, useState } from "react";

import FuelQuoteHistoryContext from "../../contexts/fuel-quote-history";
import ProfileInfoContext from "../../contexts/profile-info";
import LoginContext from "../../contexts/login";
import LoadingContext from "../../contexts/loading";
import styles from "./Popup.module.css";
import { createQuote, getPrice } from "../../requests/fuel-quote-history";

var totalDefVal = "";
var suggDefVal = "";

const Popup = (props) => {
  const HistoryCtx = useContext(FuelQuoteHistoryContext);
  const ProfileCtx = useContext(ProfileInfoContext);
  const LoginCtx = useContext(LoginContext);
  const LoadingCtx = useContext(LoadingContext);

  const [reload, setreload] = useState(true);

  let navigate = useNavigate();

  const profileInfo = ProfileCtx.ProfileInfo;

  const gallonsInputRef = useRef();
  const dateInputRef = useRef();
  const priceInputRef = useRef();
  const totalInputRef = useRef();
  const address =
    profileInfo.addr1 +
    " " +
    profileInfo.addr2 +
    ", " +
    profileInfo.city +
    ", " +
    profileInfo.state +
    ", " +
    profileInfo.zip;

  var isLoading = false;

  useEffect(() => {
    if (isLoading) LoadingCtx.currentlyLoading();
    LoadingCtx.finishedLoading();
  });

  function SubmitHandler(event) {
    event.preventDefault();

    const enteredGs = gallonsInputRef.current.value;
    const enteredDateRequested = dateInputRef.current.value;
    const enteredP = priceInputRef.current.value;
    const enteredT = totalInputRef.current.value;
    const dateDelivered = "2022-01-01";

    let info = {
      gallons: enteredGs,
      addr: address,
      date_requested: enteredDateRequested,
      date_delivered: dateDelivered, //FIXME: HOW TO GET THIS?
      price_per_gallon: enteredP,
      total: enteredT,
    };

    isLoading = true;
    createQuote(info, LoginCtx.Login)
      .then((res) => {
        info = [
          LoginCtx.Login.username,
          enteredDateRequested,
          dateDelivered,
          enteredGs,
          "$" + enteredP,
          "$" + enteredT,
        ];
        HistoryCtx.addFuelQuoteHistory(info);
        isLoading = false;
        navigate("/");
        props.handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function pricingModuleHandler(event) {
    const galsReq = gallonsInputRef.current.value;
    if (galsReq !== "") {
      const data = {
        addr: address,
        gals: galsReq,
      };

      isLoading = true;
      getPrice(LoginCtx.Login, data)
        .then((res) => {
          totalDefVal = parseFloat(res.data.total.toFixed(2));
          suggDefVal = parseFloat(res.data.suggested_ppg.toFixed(2));
          isLoading = false;
          setreload(!reload);
        })
        .catch((err) => {
          isLoading = false;
          console.log(err);
        });
    }
  }

  return (
    <div className={styles.popup_box}>
      <div className={styles.box}>
        <span className={styles.close_icon} onClick={props.handleClose}>
          x
        </span>
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
          <input type="date" id="date" ref={dateInputRef} required />
        </div>
        <div className={styles.control}>
          <label htmlFor="suggested_ppg">Suggested Price / Gallon</label>
          <input
            type="number"
            id="suggested_ppg"
            ref={priceInputRef}
            value={suggDefVal}
            readOnly
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="total">Total Amount Due</label>
          <input
            type="number"
            id="total"
            ref={totalInputRef}
            value={totalDefVal}
            readOnly
          />
        </div>
        <div className={styles.actions}>
          <button onClick={pricingModuleHandler}>Get Quote</button>
        </div>
        <div className={styles.actions}>
          <button onClick={SubmitHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
