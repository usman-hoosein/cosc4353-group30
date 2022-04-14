import { useState, useContext } from "react";

import Popup from "../components/form/Popup";
import styles from "./FuelQuoteHistory.module.css";

import FuelQuoteContext from "../contexts/fuel-quote-history";
import ProfileInfoContext from "../contexts/profile-info";

function FuelQuoteHistory() {
  const HistoryCtx = useContext(FuelQuoteContext);
  const ProfileCtx = useContext(ProfileInfoContext);

  const [isOpen, setIsOpen] = useState(false);

  const profileInfo = ProfileCtx.ProfileInfo;
  var history = HistoryCtx.FuelQuoteHistory;

  let addr2 = profileInfo.addr2;
  let address;
  if (addr2 === null)
    address =
      profileInfo.addr1 +
      ", " +
      profileInfo.city +
      ", " +
      profileInfo.state +
      ", " +
      profileInfo.zip;
  else
    address =
      profileInfo.addr1 +
      " " +
      addr2 +
      ", " +
      profileInfo.city +
      ", " +
      profileInfo.state +
      ", " +
      profileInfo.zip;

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  console.log(history);
  return (
    <div className={styles.container}>
      {isOpen && <Popup handleClose={togglePopup} />}
      <div>
        <h1> Fuel Quote History </h1>
        <button onClick={togglePopup} className={styles.button_form}>
          Create New Quote
        </button>
        <span>
          <table className={styles.table}>
            <thead>
              <tr>
                <th> Gallons Requested </th>
                <th> Delivery Address </th>
                <th> Delivery Date </th>
                <th> Price / Gallon </th>
                <th> Total Amount Paid </th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => {
                return (
                  <tr key={history.indexOf(entry)}>
                    <th>{entry[3]}</th>
                    <th>{address}</th>
                    <th>{entry[1].includes("T") ? entry[1].split("T")[0] : entry[1]}</th>
                    <th>{entry[4]}</th>
                    <th>{entry[5]}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </span>
      </div>
    </div>
  );
}

export default FuelQuoteHistory;
