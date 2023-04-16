import { LocationsContext } from '../context/locationsContext';
import { useContext } from 'react';

export const useLocationsContext = () => {
  const context = useContext(LocationsContext)

  if(!context) {
    throw Error('useLocationsContext must be used inside an LocationsContextProvider')
  }

  return context
}