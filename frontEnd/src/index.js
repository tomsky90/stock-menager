import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { LocationsContextProvider } from "./context/locationsContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LocationsContextProvider>
        <App />
      </LocationsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
