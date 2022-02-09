import { useRef } from "react";

import styles from "./Register.module.css";

function Register(props) {
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

    props.setNeedsRgst(false);

    // const token = await loginUser(loginData);
  };
  
  const cancelHandler = async (event) => {
    event.preventDefault();
    props.setNeedsRgst(false);
  };

  return (
    <div className={styles.login_wrapper}>
      <h1>Create Account</h1>
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
          <button>Sign Up</button>
        </div>
      </form>
      <a href="/" className={styles.redirect}>Already have an account?</a>
    </div>
  );
}
export default Register;
