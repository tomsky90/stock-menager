import React from "react";
//components
import LocationDetails from "../locationDetails/LocationDetails";
//styles
import './locationList.css'

const LocationsList = ({ locations }) => {
  const renderLocations = locations.map((location) => (
    <LocationDetails key={location._id} location={location} />
  ));

  return (
    <div className="location-list-wrapper">{console.log(locations)}
      {renderLocations && renderLocations}
    </div>
  );
};

export default LocationsList;
