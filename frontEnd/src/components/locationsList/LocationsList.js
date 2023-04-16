import React from "react";
//components
import LocationDetails from "../locationDetails/LocationDetails";
//styles
import './locationList.css'

const LocationsList = ({ locations, isSingleBin }) => {
  

  return (
    <div className="location-list-wrapper">
      {locations && locations.map((location) => (
    <LocationDetails key={location._id} location={location}  isSingleBin={isSingleBin}/>
  ))}
  
    </div>
  );
};

export default LocationsList;
