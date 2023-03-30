import React, { useState } from "react";
//components
import StepCounter from "../components/stepCounter/StepCounter";
import Message from "../components/message/Message";
import SingleInputForm from "../components/singleInputForm/SingleInputForm";
//helpers
import {
  getSingleBin,
  getSingleItem,
  addToItem,
  takeOffItem,
} from "../fetchData/FetchData";

const BinTransfer = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [data, setData] = useState();
  const [binTransferFrom, setBinTransferFrom] = useState(null);
  const [binTransferTo, setBinTransferTo] = useState(null);
  const [itemTransferred, setItemTransferred] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [itemCodeInput, setItemCodeInput] = useState("");
  const [itemQtyInput, setItemQtyInput] = useState("");
  const [qtyToBeTransferred, setQtyToBeTransferred] = useState("");
  const [itemToBeAddedTo, setItemToBeAddedTo] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)

  //get bin to transfer from
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.length < 1) {
      setError("Enter valid bin number!");
      return;
    }

    const response = await getSingleBin(inputValue);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError("");
      setData(json);
      setBinTransferFrom(json);
      setActiveStep(2);
      setInputValue("");
    }
  };

  // find item you want to transfer
  const handleItemSubmit = async (e) => {
    e.preventDefault();

    if (itemCodeInput.length < 1 || itemCodeInput === "") {
      setError("Enter Valid Part Number!");
      return;
    }

    const response = await getSingleItem(itemCodeInput);
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError("");
      const bin = json.find((i) => i.title === binTransferFrom.title);
      const part = bin.items.find((i) => i.title === itemCodeInput);
      setItemTransferred(part);
      setActiveStep(3);
    }
  };

  // choose how many items you want to transfer
  const selectQtyToBePicked = (e) => {
    e.preventDefault();
    setError("");
    if (itemQtyInput > itemTransferred.qty) {
      setError(
        `Max avalible ${itemTransferred.qty}. Please enter correct amount.`
      );
      return;
    }
    if (itemQtyInput === "") {
      setError(`Please enter amount you want to transfer.`);
      return;
    }
    setQtyToBeTransferred(itemQtyInput);
    setActiveStep(4);
  };

  // choose bin you want to transfer to
  const getTransferToBin = async (e) => {
    e.preventDefault();

    if (inputValue.length < 1) {
      setError("Enter valid bin number!");
      return;
    }

    if (inputValue === binTransferFrom.title) {
      setError("Can not complete operation, you need to choose different bin!");
      return;
    }

    const response = await getSingleBin(inputValue);
    const json = await response.json();
    const part = json.items.find((i) => i.title === itemCodeInput);

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError("");
      setData(json);
      setBinTransferTo(json);
      setItemToBeAddedTo(part);
      setActiveStep(5);
    }
  };

  // handle transfer
  const handleTransfer = async () => {
    setError(null);
    setLoading(true);

    //pick Item from pick bin
    const item = {
      title: itemTransferred.title,
      qty: qtyToBeTransferred,
      exp: itemTransferred.exp,
    };
    const response = await takeOffItem(itemTransferred._id, item);
    const json = await response.json()
    if (!response.ok) {
      setError(json.error);
      setLoading(false);
    }
    //if response.ok update qty in bin transferTo 
    if (response.ok) {
      const response = await addToItem(itemToBeAddedTo._id, item);
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setLoading(false);
      }
      if (response.ok) {
        setError(null);
        setMessage("Item Succesfully Transfered!");
        setLoading(false);
      }
    }
  };

  return (
    <div className="bin-transfer-page">
      <h1>Bin transfer</h1>
      {error && <Message status="error" message={error} />}
      {message && <Message status="succes" message={message} />}
      {/* display progress bar */}
      <StepCounter steps={5} activeStep={activeStep} />
      {/* display bin form */}
      {activeStep === 1 ? (
        <SingleInputForm
          handelSubmit={handleSubmit}
          setInputValue={setInputValue}
          inputValue={inputValue}
          type="text"
          title="Enter Bin Name:"
        />
      ) : null}
      {/* display item form */}
      {activeStep === 2 ? (
        <SingleInputForm
          handelSubmit={handleItemSubmit}
          setInputValue={setItemCodeInput}
          inputValue={itemCodeInput}
          type="text"
          title="Enter Item Code:"
        />
      ) : null}

      {/* display qty form */}
      {activeStep === 3 && (
        <SingleInputForm
          handelSubmit={selectQtyToBePicked}
          setInputValue={setItemQtyInput}
          inputValue={itemQtyInput}
          type="number"
          title="Enter qty you want to move:"
        />
      )}

      {/* display bin form */}
      {activeStep === 4 ? (
        <SingleInputForm
          handelSubmit={getTransferToBin}
          setInputValue={setInputValue}
          inputValue={inputValue}
          type="text"
          title="Enter bin name you trasfer to:"
        />
      ) : null}

      {/* display summary */}
      {activeStep === 5 && (
        <div className="transfer-summary">
          <div>
            <h3>You move: </h3>
            <p>Item qty: {qtyToBeTransferred}</p>
            <p>Item code:{itemTransferred.title}</p>
            <p>Bin transfer from: {binTransferFrom.title}</p>
            <p>Bin transfer to: {binTransferTo.title}</p>
          </div>
         { <button  className="transfer-summary button" onClick={handleTransfer}>
            Transfer
          </button>}
        </div>
      )}

      {/* display tabel  */}
      {data && (
        <div className="items-list" key={data._id}>
          <div className="items-list__header">
            <p>Bin</p>
            <p>part</p>
            <p>qty</p>
          </div>
          {/* display items list */}
          {activeStep === 2 || (activeStep === 5 && data)
            ? data.items.map((part) => {
                return (
                  <div key={part._id} className="items-list__item ">
                    <p>{data.title}</p> <p>{part.title}</p> <p>{part.qty}</p>
                  </div>
                );
              })
            : null}

          {/* display selected item */}
          {activeStep === 3 || (activeStep === 4 && itemTransferred) ? (
            <div key={itemTransferred._id} className="items-list__item ">
              <p>{binTransferFrom.title}</p> <p>{itemTransferred.title}</p>{" "}
              <p>{itemTransferred.qty}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default BinTransfer;
