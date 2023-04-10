import React, { useState } from "react";
//components
import Message from "../../components/message/Message";
import SingleInputForm from "../../components/singleInputForm/SingleInputForm";
import StepCounter from "../../components/stepCounter/StepCounter";
import ItemTableList from "../../components/itemsTableList/itemsTableList";
//fetchers
import { getSingleItem, getSingleBin, takeOffItem } from "../../fetchData/FetchData";
//styles
import './pickItem.css'
//hooks
import { useAuthContext } from "../../hooks/useAuthContext";

const PickItem = () => {
  const [itemInputValue, setItemInputValue] = useState("");
  const [binTitleInput, setBinTitleInput] = useState("");
  const [itemTitle, steItemTitle] = useState("");
  const [items, setItems] = useState(null);
  const [binPickFrom, setBinPickFrom] = useState(null);
  const [qtyInputValue, setQtyInputValue] = useState("");
  const [error, setError] = useState(null);
  const [itemQty, setItemQty] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [itemTransferred, setItemTransferred] = useState(null);
  const [message, setMessage] = useState('')
  const { user } = useAuthContext()

  //total qty for searched item
  const addQty = (locations) => {
    let count = 0;
    for (const location of locations) {
      for (const item of location.items) {
        if (item.title === itemInputValue) {
          count += item.qty;
        }
      }
    }
    setItemQty(count);
  };

  //find bins containing item
  const handelSubmit = async (e) => {
    e.preventDefault();
    setItemQty("");

    if (itemInputValue.length < 1) {
      setError("Enter Valid Part Number!");
      return;
    }

    const response = await getSingleItem(itemInputValue, user);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      addQty(json);
      setItems(json);
      setStep(2);
      steItemTitle(itemInputValue);
      setItemInputValue("");
    }
  };

  //find Bin
  const getBin = async (e) => {
    e.preventDefault();
    if (binTitleInput < 4) {
      setError("Please Enter Correct Bin Code.");
    }

    const response = await getSingleBin(binTitleInput, user);
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setBinPickFrom([json]);
      const part = json.items.find((i) => i.title === itemTitle);
      setItemTransferred(part);
      setStep(3);
    }
  };

  //select qty to be transfered
  const setQtyToTransfer = () => {
    setStep(4);
  };

  //handle bin pick
  const handleBinPick = async () => {
    setIsLoading(true)

    const item = {
      title: itemTransferred.title,
      qty: qtyInputValue,
      exp: itemTransferred.exp,
      itemId: itemTransferred._id,
    };
    const response = await takeOffItem(binPickFrom[0]._id, item, user);
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }
    if(response.ok) {
      setMessage('Item Picked Succesfully')
    }

  }

  return (
    <div className="item-search-wrapper">
      <h1>Pick Item</h1>
      {error && <Message status="error" message={error} />}
      {message && <Message status='succes' message={message}/>}
      {itemQty && (
        <div className="item-search__total-qty">Total on Stock: {itemQty}</div>
      )}
      <StepCounter steps={5} activeStep={step} />
      {step === 1 ? (
        <SingleInputForm
          handelSubmit={handelSubmit}
          setInputValue={setItemInputValue}
          inputValue={itemInputValue}
          type="text"
          title="Enter Item Code:"
        />
      ) : null}
      {step === 2 ? (
        <SingleInputForm
          handelSubmit={getBin}
          setInputValue={setBinTitleInput}
          inputValue={binTitleInput}
          type="text"
          title="Enter Bin Code:"
        />
      ) : null}
      {step === 2 ? <ItemTableList data={items} itemTitle={itemTitle} /> : null}
      {step === 3 ? (
        <SingleInputForm
          handelSubmit={setQtyToTransfer}
          setInputValue={setQtyInputValue}
          inputValue={qtyInputValue}
          type="number"
          title="Enter Quantity You Want To Pick:"
        />
      ) : null}
      {step === 3 ? (
        <ItemTableList data={binPickFrom} itemTitle={itemTitle} />
      ) : null}
      {step === 4 && <div className="pick-item__summary">
      
          <div>
            <h3>You Pick: </h3>
            <p>Item qty: {qtyInputValue}</p>
            <p>Item code:{itemTitle}</p>
            <p>Pick from Bin: {binPickFrom[0].title}</p>
            
          </div>
          {!isLoading && (
            <button
              className="transfer-summary button"
              onClick={handleBinPick}
            >
              Complete
            </button>
          )}
          {isLoading && (
            <button
              disabled
              className="transfer-summary button"
              onClick={handleBinPick}
            >
              Complete
            </button>
          )}
        </div>
      }
    </div>
  );
};

export default PickItem;
