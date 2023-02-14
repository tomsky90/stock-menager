import React, { useState } from "react";
import StepCounter from "../components/stepCounter/StepCounter";

const BinTransfer = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [data, setData] = useState();
  const [binTransferFrom, setBinTransferFrom] = useState(null);
  const [binTransferTo, setBinTransferTo] = useState(null);
  const [itemTransfered, setItemTransfered] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [itemCodeInput, setItemCodeInput] = useState("");
  const [error, setError] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.length < 1) {
      setError("Enter valid bin number!");
      return;
    }

    const response = await fetch("/api/locations/" + inputValue);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setData(json);
      setBinTransferFrom(json);
      setActiveStep(2);
    }
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.length < 1) {
      setError("Enter Valid Part Number!");
      return;
    }

    const response = await fetch("/api/locations/find-items/" + itemCodeInput);

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setItemTransfered(json);
    }
  };

  return (
    <div className="bin-transfer-page">
      <h1>Bin transfer</h1>
      <StepCounter steps={3} activeStep={activeStep} />
      {activeStep === 1 ? (
        <form onSubmit={handelSubmit} className="item-search__form">
          <label htmlFor="item-input">Select Bin:</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value.toUpperCase());
            }}
            id="item-input"
          />
          <button type="submit">Search</button>
          {error && <div className="error-message">{error}</div>}
        </form>
      ) : null}
      {activeStep === 2 ? (
        <form
          onSubmit={handleItemSubmit}
          className="bin-transfare-page__item-form"
        >
          <div className="bin-transfer-page__item-form__input-wrapper">
            <label htmlFor="partInput">Item Code:</label>
            <input
              type="text"
              value={itemCodeInput}
              onChange={(e) => {
                setItemCodeInput(e.target.value.toUpperCase());
              }}
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      ) : null}

      {data && (
        <div className="items-list" key={data._id}>
          <div className="items-list__header">
            <p>Bin</p>
            <p>part</p>
            <p>qty</p>
          </div>

          {activeStep === 2 && data &&
            data.items.map((part) => {
              return (
                <div key={part._id} className="items-list__item ">
                  <p>{data.title}</p> <p>{part.title}</p> <p>{part.qty}</p>
                </div>
              );
            })}

          {itemTransfered ? (
            <div key={itemTransfered._id} className="items-list__item ">
              <p>{itemTransfered.title}</p> <p>{itemTransfered.title}</p>{" "}
              <p>{itemTransfered.qty}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default BinTransfer;
