import React, { useState } from "react";
//components
import LocationDetails from "../components/locationDetails/LocationDetails";
import SingleInputForm from "../components/singleInputForm/SingleInputForm";
import Message from "../components/message/Message";
//fetchers
import { getSingleBin } from "../fetchData/FetchData";

const LocationSearch = () => {
  const [location, setLocation] = useState();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const getBin = async (e) => {
    e.preventDefault();
    setError("");
    if (inputValue.length < 4) {
      setError("Please enter correct Bin Title.");
      return;
    }
    const response = await getSingleBin(inputValue);
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setLocation(json);
    }
  };

  return (
    <div className="location-search-page">
      {error && <Message status="error" message={error} />}
      <SingleInputForm
        handelSubmit={getBin}
        setInputValue={setInputValue}
        inputValue={inputValue}
        type="text"
        title="Enter Bin Name:"
      />
      <div className="filterd-locations-wrapper">
        {location && <LocationDetails location={location} key={location._id} />}
      </div>
    </div>
  );
};

export default LocationSearch;
