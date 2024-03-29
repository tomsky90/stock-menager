import { createContext, useReducer } from "react";

export const ItemsContext = createContext()

export const itemsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return{
        items: action.payload
      }
      default:
        return state
  }
}

export const ItemsContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(itemsReducer, {items: null})
  return(
    <ItemsContext.Provider value={{...state, dispatch}}>
      { children }
    </ItemsContext.Provider>
  )
}