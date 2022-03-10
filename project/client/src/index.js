import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { LoginContextProvider } from "../src/contexts/login";
import { ProfileInfoContextProvider } from "../src/contexts/profile-info";
import { FuelQuoteHistoryContextProvider } from "../src/contexts/fuel-quote-history";
import { LoadingContextProvider } from "../src/contexts/loading";

ReactDOM.render(
  <LoginContextProvider>
    <LoadingContextProvider>
      <ProfileInfoContextProvider>
        <FuelQuoteHistoryContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FuelQuoteHistoryContextProvider>
      </ProfileInfoContextProvider>
    </LoadingContextProvider>
  </LoginContextProvider>,
  document.getElementById("root")
);
