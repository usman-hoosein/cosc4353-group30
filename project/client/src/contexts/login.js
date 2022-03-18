import { createContext, useState } from "react";

const LoginContext = createContext({
  Login: {},
  hadRegistration: false,
  addLogin: (info) => {},
  isLoggedIn: () => {},
  registration: () => {},
});

export function LoginContextProvider(props) {
  const [userLogin, setUserLogin] = useState(null);
  const [justRegistered, setJustRegistered] = useState(false);

  function addLoginHandler(info) {
    setUserLogin({ username: info.username, password: info.password });
  }

  function isLoggedInHandler() {
    if (userLogin === null) return false;
    else return true;
  }

  function registrationHandler() {
    setJustRegistered(!justRegistered);
  }

  const context = {
    Login: userLogin,
    hadRegistration: justRegistered,
    addLogin: addLoginHandler,
    isLoggedIn: isLoggedInHandler,
    registration: registrationHandler,
  };

  return (
    <LoginContext.Provider value={context}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContext;
