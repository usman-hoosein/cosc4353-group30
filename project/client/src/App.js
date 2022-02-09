import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Layout from "./components/layouts/Layout";

import Login from "./components/login/Login";
import Register from "./components/login/Register";
import FuelQuoteForm from "./pages/FuelQuoteForm";
import FuelQuoteHistory from "./pages/FuelQuoteHistory";
import Profile from "./pages/Profile";

function App() {
  const [token, setToken] = useState(false);
  const [needsRgst, setNeedsRgst] = useState(false);


  if (!token && !needsRgst) {
    return <Login setToken={setToken} setNeedsRgst={setNeedsRgst} />;
  }
  else if (needsRgst) {
    return <Register setNeedsRgst={setNeedsRgst} />
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<FuelQuoteForm />} />
        <Route path="/fuel-quote-history" element={<FuelQuoteHistory />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default App;
