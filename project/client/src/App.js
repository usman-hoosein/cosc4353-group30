import { Route, Routes } from "react-router-dom";
import { useState, useContext } from "react";

import Layout from "./components/layouts/Layout";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import InitializeFQH from "./components/initialize/fuel-quote-history";
import InitializeProfile from "./components/initialize/profile";

import Loading from "./pages/Loading";
import FuelQuoteHistory from "./pages/FuelQuoteHistory";
import Profile from "./pages/Profile";
import NotFound from "./pages/404";

import LoginContext from "./contexts/login";
import LoadingContext from "./contexts/loading";

function App() {
  const LoginCtx = useContext(LoginContext);
  const LoadingCtx = useContext(LoadingContext);

  const [needsRgst, setNeedsRgst] = useState(false);
  const [needsFQHInit, setNeedsFQHInit] = useState(true);
  const [needsProfInit, setNeedsProfInit] = useState(true);

  if (LoadingCtx.Loading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  if (LoginCtx.isLoggedIn() === false && !needsRgst) {
    return <Login setToken={LoginCtx.addLogin} setNeedsRgst={setNeedsRgst} />;
  } else if (needsRgst) {
    return <Register setNeedsRgst={setNeedsRgst} />;
  }

  if (LoginCtx.isLoggedIn() === true) {
    if (needsFQHInit) return <InitializeFQH setInit={setNeedsFQHInit} />;
    else if (needsProfInit)
      return <InitializeProfile setInit={setNeedsProfInit} />;
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
