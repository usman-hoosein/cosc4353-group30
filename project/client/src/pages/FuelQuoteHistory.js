import { useState } from "react";
import Popup from "../components/form/Popup";
import styles from "./FuelQuoteHistory.module.css"

function FuelQuoteHistory() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.container}>
      <button onClick={togglePopup} className={styles.button_form}>Create New Form</button>
      {isOpen && <Popup handleClose={togglePopup} />}
    </div>
  );
}

export default FuelQuoteHistory;
