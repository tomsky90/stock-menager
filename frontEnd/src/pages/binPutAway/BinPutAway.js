import React, { useState, useEffect } from "react";
//components
import ItemForm from "../../components/itemForm/ItemForm";
import SingleInputForm from "../../components/singleInputForm/SingleInputForm";
import StepCounter from "../../components/stepCounter/StepCounter";
import ItemsTableList from "../../components/itemsTableList/itemsTableList";
import Message from "../../components/message/Message";
import PutAwayItemsList from "./putAwayItemsList/PutAwayItemsList";
import Loader from "../../components/loader/Loader";
import StepOne from "./stepOne/StepOne";
//get data
import {
  getSingleBin,
  putItemAway,
  addToItemListItem,
  getAllItems,
} from "../../fetchData/FetchData";
//hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useItemsContext } from "../../hooks/useItemsContext";
//styles
import "./binPutAway.css";

const BinPutAway = () => {
  const [binsContainItem, setBinsContainItem] = useState(null);
  const [itemTitle, setItemTitle] = useState("");
  const [binToAddTo_id, setBinToAddTo_id] = useState("");
  const [itemInputValue, setItemInputValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [itemExpiryInput, setItemExpiryInput] = useState("");
  const [itemQtyInput, setItemQtyInput] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { items, dispatch } = useItemsContext();

  //get list of items on load
  
    const getItems = async () => {
      setIsLoading(true);
      const response = await getAllItems(user);
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        setIsLoading(false);
      }
      if (response.ok) {
        dispatch({ type: "SET_ITEMS", payload: json });
        setIsLoading(false);
      }
    };
  useEffect(() => {
    if (user) {
      getItems();
    }
  }, []);

  const itemExpiryOnChange = (e) => {
    setItemExpiryInput(e.target.value.toUpperCase());
  };

  const itemDescriptionOnChange = (e) => {
    setItemDescription(e.target.value);
  };

  const itemQtyOnChange = (e) => {
    setItemQtyInput(e.target.value);
  };

  //get bin to add to
  const handelSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.length < 1) {
      setError("Enter valid bin number!");
      return;
    }

    const response = await getSingleBin(null, inputValue, user);
    const json = await response.json();
    if (json.error) {
      setError(json.error);
    } else {
      setBinToAddTo_id(json._id);
      setError(null);
      setActiveStep(3);
    }
  };

  //push item into location
  const pushItem = async (e) => {
    e.preventDefault();
    if (itemExpiryInput.length <= 0 || itemQtyInput <= 0) {
      return setError("Please fill in all fields.");
    }
    const qty = { qty: itemQtyInput };
    // add to total qty in admin list
    const response = await addToItemListItem(itemTitle, qty, user);
    if (response.ok) {
      const item = {
        title: itemTitle,
        qty: itemQtyInput,
        exp: itemExpiryInput,
        description: itemDescription,
      };
      // if response ok add item to bin
      const response = await putItemAway(binToAddTo_id, item, user);
      const json = await response.json();

      if (response.ok) {
        setActiveStep(4);
        setMessage(`Bin: ${json.title} updated succesfully`);
        setTimeout(() => {
          setActiveStep(1);
          setItemTitle("");
          setBinToAddTo_id("");
          setItemInputValue("");
          setInputValue("");
          setItemExpiryInput("");
          setItemQtyInput("");
          setError("");
          setMessage("");
          getItems()
        }, 3000);
      }
    }
  };

  const filteredItems = items?.filter((item) => {
    return item.title.includes(itemInputValue);
  });
  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="bin-put-away-page">
        <h1>Put Stock Away</h1>
        <StepCounter steps={4} activeStep={activeStep} />
        {error && <Message status="error" message={error} />}
        {message && <Message status="succes" message={message} />}
        {activeStep === 1 ? (
          <StepOne
            handelSubmit={handelSubmit}
            setInputValue={setItemInputValue}
            inputValue={itemInputValue}
            setError={setError}
            setItemTitle={setItemTitle}
            setItemDescription={setItemDescription}
            setActiveStep={setActiveStep} 
            setBinsContainItem={setBinsContainItem} 
            setIsLoading={setIsLoading}
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
            itemDescription={itemDescription}
            itemQtyInput={itemQtyInput}
            itemQtyOnChange={itemQtyOnChange}
            itemDescriptionOnChange={itemDescriptionOnChange}
          />
        ) : null}
        {activeStep === 1 ? (
          <div className="bin-put-away-page__suggested-bins">
            <h3>All Items</h3>
            {items && (
              <PutAwayItemsList
                list={filteredItems}
                setItemInputValue={setItemInputValue}
              />
            )}
          </div>
        ) : null}
        {activeStep === 2 ? (
          <div className="bin-put-away-page__suggested-bins">
            <h3>Suggested Bins</h3>
            {binsContainItem && (
              <ItemsTableList data={binsContainItem} itemTitle={itemTitle} />
            )}
          </div>
        ) : null}
      </div>
    );
  }
};

export default BinPutAway;
