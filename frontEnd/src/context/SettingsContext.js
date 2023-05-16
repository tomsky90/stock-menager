import { createContext, useReducer, useEffect } from "react";
import { BASEURL } from "../config.js";

export const SettingsContext = createContext();

export const settingsReducer = (state, action) => {
  switch (action.type) {
    case "SETSETTINGS":
      return { settings: action.payload };
    default:
      return state;
  }
};

export const SettingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, {
    settings: null,
  });

  useEffect(() => {
    const getSettings = async () => {
      const response = await fetch(BASEURL + '/api/settings/get-settings')
      const json = await response.json()
      if(!response.ok) {
        console.log(json)
      }
      if(response.ok) {
        const settings = {}
        json.forEach(element => {
          settings[element.title] = {qty: element.qty, id: element._id}
        });
        dispatch({type: 'SETSETTINGS', payload: settings})
      }
    }

    getSettings()
  }, [])


  return (
    <SettingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};
