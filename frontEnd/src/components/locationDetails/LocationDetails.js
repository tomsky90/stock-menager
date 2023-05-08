import React from "react";
//authContext hook;
//components import
import ItemDetails from "../itemDetails/ItemDetails";
//styles
import './locationDetails.css'

const LocationDetails = ({ location, isSingleBin }) => {
  
  return (
    <div className="location-detail-wrapper">
      <div className="location-detail-title-wrapper">
        <h3>Bin: {location.title}</h3>
      </div>


      {location.items &&
        location.items.map((item) => (
          <ItemDetails
            isSingleBin={isSingleBin}
            key={item._id}
            item={item}
            location={location}
          />
        ))}
    </div>
  );
};

export default LocationDetails;
