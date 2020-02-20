import React, { useState, useEffect } from "react";

const AppContext = React.createContext([{}, () => {}]);

const DEFAULT_STATE = {
  appIsLoading: true,
  icons: [],
  categories: ["All"],
  selectedCategory: "All",
  iconToPreview: {},
  tags: []
};

const AppContextProvider = props => {
  const [state, setState] = useState(DEFAULT_STATE);

  // EACH TIME ICONS DATA CHANGE
  // REMAP CATEGORIES
  useEffect(() => {
    if (state.icons.length > 0) {
      const rootFolders = [
        ...new Set(
          state.icons.map(item =>
            item.key.substring(1, item.key.substring(1).indexOf("\\") + 1)
          )
        )
      ];

      setState(state => ({
        ...state,
        categories: [...state.categories, ...rootFolders]
      }));
      console.log("Categories were set...");
    }
  }, [state.icons]);

  // useEffect(() => {
  //   console.log(state);
  // });

  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
