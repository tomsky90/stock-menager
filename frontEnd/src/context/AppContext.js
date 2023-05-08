import { createContext, useReducer } from 'react';

export const AppContext = createContext();

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'NOTACTIVE':
      return {mobileNavActive: action.payload}
    case 'ACTIVE':
      return {mobileNavActive: action.payload}
    default:
      return state
  }
}

export const AppContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(appReducer, {
    mobileNavActive: false
  })


  return (
    <AppContext.Provider value={{...state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}