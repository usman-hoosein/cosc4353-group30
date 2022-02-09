import React from "react";

import styles from "./Popup.module.css";

const Popup = (props) => {
  return (
    <div className={styles.popup_box}>
      <div className={styles.box}>
        <span className={styles.close_icon} onClick={props.handleClose}>
          x
        </span>
        <form className={styles.form}>
          <div className={styles.control}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              required
              id="username"
              required
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              required
              id="password"
              required
            />
          </div>
          <div className={styles.actions}>
            <button>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
