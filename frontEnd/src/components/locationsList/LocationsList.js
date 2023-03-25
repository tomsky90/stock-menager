import React from "react";
//components
import LocationDetails from "../locationDetails/LocationDetails";

const LocationsList = ({ locations }) => {
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
