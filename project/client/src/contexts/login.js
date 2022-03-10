import { createContext, useState } from "react";

const LoginContext = createContext({
  Login: {},
  addLogin: (info) => {},
});

export function LoginContextProvider(props) {
  const [userLogin, setUserLogin] = useState({});

  function addLoginHandler(info) {
    setUserLogin({ username: info.username, password: info.password });
  }

  const context = {
    Login: userLogin,
    addLogin: addLoginHandler,
  };

  return (
    <LoginContext.Provider value={context}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContext;