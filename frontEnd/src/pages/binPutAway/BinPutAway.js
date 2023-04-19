import React, { useState } from "react";
//components
import ItemForm from "../../components/itemForm/ItemForm";
import SingleInputForm from "../../components/singleInputForm/SingleInputForm";
import StepCounter from "../../components/stepCounter/StepCounter";
import ItemsTableList from "../../components/itemsTableList/itemsTableList";
import Message from "../../components/message/Message";
//get data
import {
  getSingleBin,
  putItemAway,
  getSingleItem,
} from "../../fetchData/FetchData";
//useAuthContext hook
import { useAuthContext } from "../../hooks/useAuthContext";
//styles
import "./binPutAway.css";

const BinPutAway = () => {
  const [items, setItems] = useState(null);
  const [itemTitle, setItemTitle] = useState("");
  const [binToAddTo_id, setBinToAddTo_id] = useState("");
  const [itemInputValue, setItemInputValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [itemExpiryInput, setItemExpiryInput] = useState("");
  const [itemQtyInput, setItemQtyInput] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const { user } = useAuthContext();

  const itemExpiryOnChange = (e) => {
    setItemExpiryInput(e.target.value.toUpperCase());
  };

  const itemQtyOnChange = (e) => {
    setItemQtyInput(e.target.value);
  };

  //find bins containing item
  const findItem = async (e) => {
    e.preventDefault();

    if (itemInputValue.length < 1) {
      setError("Enter Valid Part Number!");
      return;
    }

    const response = await getSingleItem(itemInputValue, user);
    const json = await response.json();

    if (!response.ok) {
      if(json.error === 'Can't find item' {
       setError(null);
      setItems(json);
      setActiveStep(2);
      setItemTitle(itemInputValue);
      setItemInputValue("");
      } else {
      setError(json.error);
      } 
    }
    if (response.ok) {
      setError(null);
      setItems(json);
      setActiveStep(2);
      setItemTitle(itemInputValue);
      setItemInputValue("");
    }
  };

  //get bin to add to
  const handelSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.length < 1) {
      setError("Enter valid bin number!");
      return;
    }

    const response = await getSingleBin(inputValue, user);
    const json = await response.json();
    if (json.error) {
      setError(json.error);
    } else {
      console.log(json);
      setBinToAddTo_id(json._id);
      setError(null);
      setActiveStep(3);
    }
  };

  const pushItem = async (e) => {
    e.preventDefault();
    if (itemExpiryInput.length <= 0 || itemQtyInput <= 0) {
      return setError("Please fill in all fields.");
    }
    const item = {
      title: itemTitle,
      qty: itemQtyInput,
      exp: itemExpiryInput,
    };
    const response = await putItemAway(binToAddTo_id, item, user);
    const json = await response.json();

    if (response.ok) {
      setActiveStep(4);
      setMessage(`Bin: ${json.title} updated succesfully`);
      setTimeout(() => {
        setActiveStep(1);
        setItems(null);
        setItemTitle("");
        setBinToAddTo_id("");
        setItemInputValue("");
        setInputValue("");
        setItemExpiryInput("");
        setItemQtyInput("");
        setError("");
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="bin-put-away-page">
      <h1>Put Stock Away</h1>
      <StepCounter steps={4} activeStep={activeStep} />
      {error && <Message status="error" message={error} />}
      {message && <Message status="succes" message={message} />}
      {activeStep === 1 ? (
        <SingleInputForm
          handelSubmit={findItem}
          setInputValue={setItemInputValue}
          inputValue={itemInputValue}
          type="text"
          title="Enter Item Code:"
          btnText="Search"
        />
      ) : null}
      {activeStep === 2 ? (
        <SingleInputForm
          handelSubmit={handelSubmit}
          setInputValue={setInputValue}
          inputValue={inputValue}
          error={error}
          type="text"
          title="Select Bin"
          btnText="Search"
        />
      ) : null}
      {activeStep === 3 ? (
        <ItemForm
          handleSubmit={pushItem}
          formActive={true}
          itemCodeInput={itemTitle}
          itemExpiryInput={itemExpiryInput}
          itemExpiryOnChange={itemExpiryOnChange}
          itemQtyInput={itemQtyInput}
          itemQtyOnChange={itemQtyOnChange}
        />
      ) : null}
      {activeStep === 2 ? (
        <div className="bin-put-away-page__suggested-bins">
          <h3>Suggested Bins</h3>
          <ItemsTableList data={items} itemTitle={itemTitle} />
        </div>
      ) : null}
    </div>
  );
};

export default BinPutAway;
