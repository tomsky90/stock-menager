import { useEffect, useState } from "react";
//hooks
import { useLocationsContext } from "../../hooks/useLocationsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
//components
import LocationsList from "../../components/locationsList/LocationsList";
import Loader from '../../components/loader/Loader';
//fetchers
import { getData } from "../../fetchData/FetchData";

const AllBinsPage = () => {
  const {locations, dispatch} = useLocationsContext();
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    setIsLoading(true)
    const fetchLocations = async () => {
      const response = await getData(user) 
      const data = await response.json()
      if(response.ok) {
        dispatch({type: 'SET_LOCATIONS', payload: data})
        setIsLoading(false)
      }
     
    }

    if(user) {
       fetchLocations()
    }

  },[user])
  if(isLoading) {
    return (
      <Loader/>
    )
  }
  return ( 
    <div className="all-bins-page">
      <LocationsList locations={locations}/>
    </div>
   );
}
 
export default AllBinsPage;