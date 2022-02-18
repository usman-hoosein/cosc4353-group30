import { useState } from "react";
import Popup from "../components/form/Popup";
import styles from "./FuelQuoteHistory.module.css";

function FuelQuoteHistory() {
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
              <tr>
                <th> 2 </th>
                <th> 123 Gallon Blvd </th>
                <th> 1 / 12 / 2022 </th>
                <th> 2.01 $ </th>
                <th> 4.02 $ </th>
              </tr>
              <tr>
                <th> 15 </th>
                <th> 432 Full Tank Road </th>
                <th> 2 / 13 / 2022 </th>
                <th> 2.88 $ </th>
                <th> 42.00 $ </th>
              </tr>
              <tr>
                <th> 3 </th>
                <th> 777 Needed Gas St. </th>
                <th> 12 / 12 / 2021 </th>
                <th> 3.91 $ </th>
                <th> 11.73 $ </th>
              </tr>
            </tbody>
          </table>
        </span>
      </div>
    </div>
  );
}

export default FuelQuoteHistory;
