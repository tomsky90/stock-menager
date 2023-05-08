import React from "react";
//components
import SingleInputForm from "../../../components/singleInputForm/SingleInputForm";
//fetchers
import { getItem, getSingleItem } from "../../../fetchData/FetchData";
//context
import { useAuthContext } from "../../../hooks/useAuthContext";

const StepOne = ({ setInputValue, inputValue, setError, setItemTitle, setItemDescription, setActiveStep, setBinsContainItem, setIsLoading }) => {
  const { user } = useAuthContext();

   //find bins containing item
   const findItem = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError('')
    if (inputValue.length < 1) {
      setError("Enter Valid Part Number!");
      setIsLoading(false)
      return;
    }

    const response = await getItem(inputValue, user);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setInputValue("");
      setIsLoading(false)
    }
    if (response.ok) {
      setError(null);
      setItemTitle(json.title);
      setItemDescription(json.description);
      const response = await getSingleItem(inputValue, user);
      const data = await response.json();
      if (!response.ok) {
        if (data.error === "Can't find Item") {
          setActiveStep(2);
          setIsLoading(false)
        } else {
          setError(json.error);
          setIsLoading(false)
        }
      }
      if (response.ok) {
        setBinsContainItem(data);
        setIsLoading(false)
        setActiveStep(2);
      }
    }
  };
  return (
    <div>
      <SingleInputForm
        handelSubmit={findItem}
        setInputValue={setInputValue}
        inputValue={inputValue}
        type="text"
        title="Enter Item Code:"
        btnText="Search"
      />
    </div>
  );
};

export default StepOne;
