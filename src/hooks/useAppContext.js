import React, { useState, useEffect } from "react";

const AppContext = React.createContext([{}, () => {}]);

const DEFAULT_STATE = {
  appIsLoading: true,
  icons: [],
  categories: [],
  selectedCategory: "All",
  selectedIcon: {}
};

const AppContextProvider = props => {
  const [state, setState] = useState(DEFAULT_STATE);

  // useEffect(() => {
  //   console.log("AppContextStateUpdated ->", state.selectedIcon);
  // }, [state.selectedIcon]);

  return (
    <AppContext.Provider value={[state, setState]}>
      {console.log("App context render ..")}
      {props.children}
    </AppContext.Provider>
  );
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
