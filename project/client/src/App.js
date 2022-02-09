import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Layout from "./components/layouts/Layout";

import Login from "./components/login/Login";
import FuelQuoteForm from "./pages/FuelQuoteForm";
import FuelQuoteHistory from "./pages/FuelQuoteHistory";
import Profile from "./pages/Profile";

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
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
