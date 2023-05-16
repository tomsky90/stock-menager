import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { LocationsContextProvider } from "./context/locationsContext";
import { ItemsContextProvider } from './context/ItemsContext';
import { AppContextProvider } from "./context/AppContext";
import { SettingsContextProvider } from "./context/SettingsContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LocationsContextProvider>
        <ItemsContextProvider>
          <AppContextProvider>
            <SettingsContextProvider>
              <App />
            </SettingsContextProvider>
          </AppContextProvider>
        </ItemsContextProvider>
      </LocationsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
