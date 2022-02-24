import { Route, Routes } from "react-router-dom";
import { useState, useContext } from "react";

import Layout from "./components/layouts/Layout";
import Login from "./components/login/Login";
import Register from "./components/login/Register";

import FuelQuoteHistory from "./pages/FuelQuoteHistory";
import Profile from "./pages/Profile";
import NotFound from "./pages/404";

import LoginContext from "./contexts/login";

function App() {
  const LoginCtx = useContext(LoginContext);

  const [needsRgst, setNeedsRgst] = useState(false);


  if (LoginCtx.Login === {} && !needsRgst) {
    return <Login setToken={LoginCtx.addLogin} setNeedsRgst={setNeedsRgst} />;
  }
  else if (needsRgst) {
    return <Register setNeedsRgst={setNeedsRgst} />
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<FuelQuoteHistory />} />
        <Route path="/profile" element={<Profile />} />

        <Route component={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
