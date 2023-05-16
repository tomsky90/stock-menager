import { SettingsContext } from "../context/SettingsContext";
import { useContext } from "react";

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  
  return context 
}

