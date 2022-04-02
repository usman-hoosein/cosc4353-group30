import { useState, useContext } from "react";

import Popup from "../components/form/Popup";
import styles from "./FuelQuoteHistory.module.css";

import FuelQuoteContext from "../contexts/fuel-quote-history";
import ProfileInfoContext from "../contexts/profile-info";

function FuelQuoteHistory() {
  const HistoryCtx = useContext(FuelQuoteContext);
  const ProfileCtx = useContext(ProfileInfoContext);

  const [isOpen, setIsOpen] = useState(false);

  var history = HistoryCtx.FuelQuoteHistory;
  var addy = ProfileCtx.ProfileInfo.addr1;

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

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
                    <th>{entry[0]}</th>
                    <th>{addy}</th>
                    <th>{entry[2]}</th>
                    <th>{entry[5]}</th>
                    <th>{entry[6]}</th>
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
