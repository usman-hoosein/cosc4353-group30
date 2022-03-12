import { useContext, useEffect } from "react";

import FuelQuoteHistoryContext from "../../contexts/fuel-quote-history";
import LoadingContext from "../../contexts/loading";
import LoginContext from "../../contexts/login";
import { getQuoteHistory } from "../../requests/fuel-quote-history";

function InitializeFQH(props) {
  const HistoryCtx = useContext(FuelQuoteHistoryContext);
  const LoadingCtx = useContext(LoadingContext);
  const LoginCtx = useContext(LoginContext);

  var isLoading = false;

  useEffect(() => {
    if (isLoading) LoadingCtx.currentlyLoading();
    LoadingCtx.finishedLoading();
  });

  if (HistoryCtx.FuelQuoteHistory === false) {
    isLoading = true;
    getQuoteHistory(LoginCtx.Login)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        //res is expected to be an array of JS objects; convert into 2D array
        let table = [];
        for (let i = 0; i < res.length; i++) {
          let temp = [];
          let elem = res[i];
          temp.push(elem[0]);
          temp.push(elem[1]);
          temp.push(elem[2]);
          temp.push(elem[3]);
          temp.push(elem[4]);
          table.push(temp);
        }
        HistoryCtx.updateFuelQuoteHistory(table);
        console.log("FQH Initialized");
        props.setInit(false);
        isLoading = false;
      })
      .catch((err) => {
        console.log("Error in getting fuel quote history: " + err);
        props.setInit(false);
        isLoading = false;
      });
  }
  return <div></div>;
}

export default InitializeFQH;
