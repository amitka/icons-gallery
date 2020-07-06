import React from "react";

const AppContext = React.createContext([{}, () => {}]);

const DEFAULT_STATE = {
  appIsLoading: true,
  icons: [], // ALL ICONS
  categories: ["All Icons"],
  selectedCategory: "All Icons",
  iconToPreview: {},
  tags: [], // ALL ICONS TAGS
};

const AppContextProvider = (props) => {
  const [state, setState] = React.useState(DEFAULT_STATE);

  React.useEffect(() => {
    //console.log(state.iconToPreview);
  }, [state]);

  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
