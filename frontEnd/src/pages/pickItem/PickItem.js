import React, { useState } from "react";
//components
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import SingleInputForm from "../../components/singleInputForm/SingleInputForm";
import StepCounter from "../../components/stepCounter/StepCounter";
import ItemsTableList from "../../components/itemsTableList/itemsTableList";
//fetchers
import { getSingleItem, getSingleBin, takeOffItem, takeOffItemListItem } from "../../fetchData/FetchData";
//styles
import './pickItem.css'
//hooks
import { useAuthContext } from "../../hooks/useAuthContext";

const PickItem = () => {
  const [itemInputValue, setItemInputValue] = useState("");
  const [binTitleInput, setBinTitleInput] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [items, setItems] = useState(null);
  const [binPickFrom, setBinPickFrom] = useState(null);
  const [qtyInputValue, setQtyInputValue] = useState("");
  const [error, setError] = useState(null);
  const [itemQty, setItemQty] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [itemToBePicked, setItemToBePicked] = useState(null);
  const [message, setMessage] = useState('')
  const { user } = useAuthContext()

  //total qty for searched item
  const addQty = (locations) => {
    let count = 0;
    for (const location of locations) {
      for (const item of location.items) {
        if (item.title === itemInputValue.trim()) {
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
    setError(null)
    setIsLoading(true)

    if (itemInputValue.length < 1) {
      setError("Enter Valid Part Number!");
      setIsLoading(false)
      return;
    }

    const response = await getSingleItem(itemInputValue, user);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false)
    }
    if (response.ok) {
      setError(null);
      addQty(json);
      setItems(json);
      setStep(2);
      setItemTitle(itemInputValue.trim());
      setItemInputValue("");
      setIsLoading(false)
    }
  };

  //find Bin
  const getBin = async (e) => {
    e.preventDefault();
    setError(null)
    setIsLoading(true)
    if (binTitleInput < 4) {
      setError("Please Enter Correct Bin Code.");
      setIsLoading(false)
      return
    }

    const response = await getSingleBin(itemTitle, binTitleInput, user);
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setIsLoading(false)
    }
    if (response.ok) {
      setError(null);
      setBinPickFrom([json]);
      const part = json.items.find((i) => i.title === itemTitle);
      setItemToBePicked(part);
      setStep(3);
      setIsLoading(false)
    }
  };

  //select qty to be transfered
  const setQtyToPick = () => {
    setError('')
    if(qtyInputValue.length === 0) {
      setError('Enter qty you want to pick')
      return
    }
    if(itemToBePicked?.qty - qtyInputValue < 0) {
      setError('Not enough items. Max avalible ' + itemToBePicked?.qty)
      return
    } else {
      setError('')
      setStep(4);
    }
    
  };

  //handle bin pick
  const handleBinPick = async () => {
    setIsLoading(true)

    const qty = { qty: qtyInputValue };
    const response = await takeOffItemListItem(itemTitle, qty, user);
    if(response.ok) {
      const item = {
        title: itemToBePicked.title,
        qty: qtyInputValue,
        exp: itemToBePicked.exp,
        itemId: itemToBePicked._id,
      };
      const response = await takeOffItem(binPickFrom[0]._id, item, user);
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        setIsLoading(false);
      }
      if(response.ok) {
        setItemQty(itemQty - qtyInputValue)
        setMessage('Item Picked Succesfully')
        setStep(5)
        setIsLoading(false)
        setTimeout(() => {
          setMessage('')
          setItemQty('')
          setBinTitleInput('')
          setQtyInputValue('')
          setStep(1)
        },3000)
      }
    }

  }
  if(isLoading) {
    return(
      <Loader/>
    )
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
          btnText='Search'
        />
      ) : null}
      {step === 2 ? (
        <SingleInputForm
          handelSubmit={getBin}
          setInputValue={setBinTitleInput}
          inputValue={binTitleInput}
          type="text"
          title="Enter Bin Code:"
          btnText='Search'
        />
      ) : null}
      {step === 2 ? <ItemsTableList data={items} itemTitle={itemTitle} /> : null}
      {step === 3 ? ( 
        <SingleInputForm
          handelSubmit={setQtyToPick}
          setInputValue={setQtyInputValue}
          inputValue={qtyInputValue}
          type="number"
          title="Enter Quantity You Want To Pick:"
          btnText='Select'
        />
      ) : null}
      {step === 3 ? (
        <ItemsTableList data={binPickFrom} itemTitle={itemTitle} />
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
