import { createContext, useState } from "react";

const LoadingContext = createContext({
  Loading: false,
  currentlyLoading: () => {},
  finishedLoading: () => {}
});

export function LoadingContextProvider(props) {
  const [userLoading, setUserLoading] = useState(false);

  function currentlyLoadingHandler() {
    setUserLoading(true);
  }

  function finishedLoadingHandler() {
    setUserLoading(false);
  }

  const context = {
    Loading: userLoading,
    currentlyLoading: currentlyLoadingHandler,
    finishedLoading: finishedLoadingHandler
  };

  return (
    <LoadingContext.Provider value={context}>
      {props.children}
    </LoadingContext.Provider>
  );
}

export default LoadingContext;
