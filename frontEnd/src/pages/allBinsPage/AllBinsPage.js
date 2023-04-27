import { useEffect } from "react";
//hooks
import { useLocationsContext } from "../../hooks/useLocationsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
//components
import LocationsList from "../../components/locationsList/LocationsList";
//fetchers
import { getData } from "../../fetchData/FetchData";

const AllBinsPage = () => {
  const {locations, dispatch} = useLocationsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await getData(user) 
      const data = await response.json()
      if(response.ok) {
        dispatch({type: 'SET_LOCATIONS', payload: data})
      }
     
    }

    if(user) {
       fetchLocations()
    }

  },[user])
  return ( 
    <div className="all-bins-page">
      <LocationsList locations={locations}/>
    </div>
   );
}
 
export default AllBinsPage;