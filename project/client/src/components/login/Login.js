import { useRef } from "react";
import PropTypes from "prop-types";

import styles from "./Login.module.css";

async function loginUser(credentials) {
  //FIX THIS: After backend is established
  return;
  //   fetch("/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(credentials),
  //   })
  //     .then((data) => data.json())
  //     .catch((err) => {
  //       console.log("loginUser Error: " + err);
  //     });
}

function Login(props) {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const loginData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    const token = await loginUser(loginData);
    props.setToken("FIX THIS");
  };

  const registerHandler = async (event) => {
    event.preventDefault();
    props.setNeedsRgst(true);
  };

  return (
    <div className={styles.login_wrapper}>
      <h1>Log In</h1>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={usernameInputRef}
            required
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={styles.actions}>
          <button>Login</button>
        </div>
      </form>
      <span>or</span>
      <div className={styles.actions}>
        <button onClick={registerHandler}>Create New Account</button>
      </div>
    </div>
  );
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setNeedsRgst: PropTypes.func.isRequired,
};
