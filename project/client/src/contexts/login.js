import { createContext, useState } from "react";

const LoginContext = createContext({
  Login: {},
  addLogin: (info) => {},
  isLoggedIn: () => {},
});

export function LoginContextProvider(props) {
  const [userLogin, setUserLogin] = useState(null);

  function addLoginHandler(info) {
    setUserLogin({ username: info.username, password: info.password });
  }

  function isLoggedInHandler() {
    if (userLogin === null) return false;
    else return true;
  }

  const context = {
    Login: userLogin,
    addLogin: addLoginHandler,
    isLoggedIn: isLoggedInHandler,
  };

  return (
    <LoginContext.Provider value={context}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContext;
