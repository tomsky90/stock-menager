import React, { useState, useEffect } from "react";
//components
import LocationDetails from "../locationDetails/LocationDetails";
//styles
import './locationList.css'
//hooks
import { useAuthContext } from "../../hooks/useAuthContext";

const LocationsList = () => {
  const [locations, setLocations] = useState([]);
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch('https://stock-menager-back-end.onrender.com/api/locations', {headers: {
        'Authorization': `Bearer ${user.token}`
      }})
      const data = await response.json()
      setLocations(data)
    }

    if(user) {
       fetchLocations()
    }

  },[user])

  const renderLocations = locations.map((location) => (
    <LocationDetails key={location._id} location={location} />
  ));

  return (
    <div className="location-list-wrapper">
      {renderLocations && renderLocations}
    </div>
  );
};

export default LocationsList;
