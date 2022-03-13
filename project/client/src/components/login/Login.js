import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import LoginContext from "../../contexts/login";
import styles from "./Login.module.css";
import { loginUser } from "../../requests/login";

function Login(props) {
  const LoginCtx = useContext(LoginContext);

  const navigate = useNavigate();

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

    if (token.statusText === "Login OK") {
      console.log("Logged in");
      props.setToken(token);
      navigate("/profile");
    } else {
      console.log("Error logging in");
      props.setToken(false);
    }
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
          <input type="text" id="username" ref={usernameInputRef} required />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" ref={passwordInputRef} required />
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
