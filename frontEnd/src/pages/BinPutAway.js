import React, { useState } from "react";
import ItemForm from "../components/ItemForm";
import StepCounter from "../components/stepCounter/StepCounter";

const BinPutAway = () => {
  const [data, setData] = useState();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(1);

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
      setActiveStep(2)
    }
  };

  return (
    <div className="bin-put-away-page">
      <h1>Put Stock Away</h1>
      <StepCounter steps={2} activeStep={activeStep}/>
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
      ) :  null }
       {activeStep === 2 ? ( <ItemForm location={data} formActive={true}/> ) : null}
      {data && (
        <div className="items-list" key={data._id}>
          <div className="items-list__header">
            <p>Bin</p>
            <p>part</p>
            <p>qty</p>
          </div>

          {data &&
            data.items.map((part) => {
              return (
                <div key={part._id} className="items-list__item ">
                  <p>{data.title}</p> <p>{part.title}</p> <p>{part.qty}</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default BinPutAway;
