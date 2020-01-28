import React, {useState, useEffect} from "react";

const AppContext = React.createContext([{}, () => {}]);

const DEFAULT_STATE = {
  appIsLoading: true,
  icons: [],
  categories: [],
  selectedCategory: ""
};

const AppContextProvider = props => {
  const [state, setState] = useState(DEFAULT_STATE);

  useEffect(() => {
    //console.log("AppContextStateUpdated ->", state);
  });

  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};

const AppContextConsumer = AppContext.Consumer;

export {AppContext, AppContextProvider, AppContextConsumer};
