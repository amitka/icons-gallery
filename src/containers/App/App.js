import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../hooks/useAppContext";
import IconsGallery from "../IconsGallery";

const App = () => {
  const [appState, setAppState] = useContext(AppContext);

  useEffect(() => {
    // LOAD ICONS DATA
    const fetchData = async () => {
      const response = await fetch("./icons.json");
      const json = await response.json();
      return json;
    };

    fetchData()
      .then(data => {
        console.log("icons loaded!");
        const rootFolders = [
          ...new Set(
            data.map(item =>
              item.key.substring(1, item.key.substring(1).indexOf("\\") + 1)
            )
          )
        ];
        setAppState(appState => ({
          ...appState,
          icons: data,
          categories: rootFolders
        }));
      })
      .catch(() => {
        console.log("App says: Error fetching icons data...");
      });
  }, []);

  return (
    <main className="App">
      <IconsGallery />
    </main>
  );
};

export default App;
