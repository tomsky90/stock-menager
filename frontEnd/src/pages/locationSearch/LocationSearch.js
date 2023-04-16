import React, { useState, useEffect } from "react";
//components
import LocationsList from "../../components/locationsList/LocationsList";
import SingleInputForm from "../../components/singleInputForm/SingleInputForm";
import Message from "../../components/message/Message";
import Loader from "../../components/loader/Loader";
//fetchers
import { getSingleBin } from "../../fetchData/FetchData";
//hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLocationsContext } from "../../hooks/useLocationsContext";
//styles
import "./locationSearch.css";

const LocationSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { locations, dispatch } = useLocationsContext();

  useEffect(() => {
    dispatch({ type: "SET_LOCATIONS", payload: [] });
  }, [dispatch]);

  const getBin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    if (inputValue.length < 4) {
      setError("Please enter correct Bin Title.");
      setIsLoading(false);
      return;
    }
    const response = await getSingleBin(inputValue, user);
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      const arr = [];
      arr.push(json);
      dispatch({ type: "SET_LOCATIONS", payload: arr });
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <Loader />;
  } 
    return (
      <div className="location-search-page">
        <h1>Search For Bin</h1>
        {error && <Message status="error" message={error} />}
        <SingleInputForm
          handelSubmit={getBin}
          setInputValue={setInputValue}
          inputValue={inputValue}
          type="text"
          title="Enter Bin Name:"
          btnText="Search"
        />
        <div className="filterd-locations-wrapper">
          {locations && (
            <LocationsList isSingleBin={true} locations={locations} />
          )}
        </div>
      </div>
    );
  
};

export default LocationSearch;
