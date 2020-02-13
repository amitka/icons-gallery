import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { AppContextProvider } from "./hooks/useAppContext";
import "./style/reset.scss";
import "./index.scss";

ReactDOM.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  document.getElementById("root")
);
