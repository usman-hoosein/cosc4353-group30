import { createContext, useState } from "react";

const FuelQuoteHistoryContext = createContext({
  FuelQuoteHistory: [], //2D array, i => table row; j => array of values for the corresponding cols of that row
  updateFuelQuoteHistory: (info) => {},
  addFuelQuoteHistory: (info) => {},
});

export function FuelQuoteHistoryContextProvider(props) {
  const [userFuelQuoteHistory, setUserFuelQuoteHistory] = useState([]);

  function addFuleQuoteHandler(info) {
    setUserFuelQuoteHistory((prevHistory) => {
      let temp = prevHistory
      temp.push(info)
      return temp;
    });
  }

  function updateFuelQuoteHistoryHandler(info) {
    // setUserFuelQuoteHistory({
    //   gallons: info.gallons,
    //   addr1: info.addr1,
    //   city: info.city,
    //   state: info.state,
    //   date: info.date,
    //   price: info.price,
    //   total: info,
    // });
  }

  const context = {
    FuelQuoteHistory: userFuelQuoteHistory,
    updateFuelQuoteHistory: updateFuelQuoteHistoryHandler,
    addFuelQuoteHistory: addFuleQuoteHandler,
  };

  return (
    <FuelQuoteHistoryContext.Provider value={context}>
      {props.children}
    </FuelQuoteHistoryContext.Provider>
  );
}

export default FuelQuoteHistoryContext;
