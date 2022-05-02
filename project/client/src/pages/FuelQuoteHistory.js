import { useState, useContext } from "react";

import Popup from "../components/form/Popup";
import styles from "./FuelQuoteHistory.module.css";

import FuelQuoteContext from "../contexts/fuel-quote-history";

function FuelQuoteHistory() {
  const HistoryCtx = useContext(FuelQuoteContext);
  var history = HistoryCtx.FuelQuoteHistory;

  const [isOpen, setIsOpen] = useState(false);

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
                    <th>{entry[3]}</th>
                    <th>{entry[6]}</th>
                    <th>
                      {entry[1].includes("T")
                        ? entry[1].split("T")[0]
                        : entry[1]}
                    </th>
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
