import { createContext, useState } from "react";

const FuelQuoteHistoryContext = createContext({
  FuelQuoteHistory: [], //2D array, i => table row; j => array of values for the corresponding cols of that row
  updateFuelQuoteHistory: (info) => {},
  addFuelQuoteHistory: (info) => {},
});

export function FuelQuoteHistoryContextProvider(props) {
  const [userFuelQuoteHistory, setUserFuelQuoteHistory] = useState(false);

  function addFuelQuoteHandler(info) {
    setUserFuelQuoteHistory((prevHistory) => {
      let temp = prevHistory
      temp.push(info)
      return temp;
    });
  }

  function updateFuelQuoteHistoryHandler(info) {
    setUserFuelQuoteHistory(info);
  }

  const context = {
    FuelQuoteHistory: userFuelQuoteHistory,
    updateFuelQuoteHistory: updateFuelQuoteHistoryHandler,
    addFuelQuoteHistory: addFuelQuoteHandler,
  };

  return (
    <FuelQuoteHistoryContext.Provider value={context}>
      {props.children}
    </FuelQuoteHistoryContext.Provider>
  );
}

export default FuelQuoteHistoryContext;
