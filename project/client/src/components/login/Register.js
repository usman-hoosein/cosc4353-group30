import { useRef, useEffect, useContext } from "react";

import styles from "./Register.module.css";
import LoginContext from "../../contexts/login";
import LoadingContext from "../../contexts/loading";
import { registerUser } from "../../requests/login";

function Register(props) {
  const LoadingCtx = useContext(LoadingContext);
  const LoginCtx = useContext(LoginContext);

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  var isLoading = false;

  useEffect(() => {
    if (isLoading) LoadingCtx.currentlyLoading();
    LoadingCtx.finishedLoading();
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const loginData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    isLoading = true;
    const token = await registerUser(loginData);
    isLoading = false;

    if (token.statusText === "Register OK") {
      props.setNeedsRgst(false);
      LoginCtx.registration();
    } else {
      console.log("Error Registering");
      props.setNeedsRgst(true);
    }
  };

  return (
    <div className={styles.login_wrapper}>
      <h1>Create Account</h1>
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
          <button>Sign Up</button>
        </div>
      </form>
      <a href="/" className={styles.redirect}>
        Already have an account?
      </a>
    </div>
  );
}
export default Register;
