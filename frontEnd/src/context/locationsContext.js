import { createContext, useReducer } from "react";

export const LocationsContext = createContext()

export const locationsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOCATIONS':
      return{
        locations: action.payload
      }
      case 'SET_LOCATION':
      return{
        locations: action.payload
      }
      default:
        return state
  }
}

export const LocationsContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(locationsReducer, {locations: null})
  return(
    <LocationsContext.Provider value={{...state, dispatch}}>
      { children }
    </LocationsContext.Provider>
  )
}