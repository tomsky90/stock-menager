import React, { useState, useEffect } from "react";
import ItemForm from "../components/ItemForm";

const BinPutAway = () => {
  const [data, setData] = useState();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [steps, setSteps] = useState(1);

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
      setSteps(2)
    }
  };

  return (
    <div className="bin-put-away-page">
      <h1>Put Stock Away</h1>
      <p>Step: {steps} of 2</p>

      <div className="bin-put-away-page__steps-wrapper">
        <div className="bin-put-away-page__steps-wrapper__step active">1</div>
        <div className={steps === 2 ? `bin-put-away-page__steps-wrapper__step__bar active` : `bin-put-away-page__steps-wrapper__step__bar` }></div>
        <div className={steps === 2 ? `bin-put-away-page__steps-wrapper__step active` : `bin-put-away-page__steps-wrapper__step`}>2</div>
      </div>
      {steps === 1 ? (
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
       {steps === 2 ? ( <ItemForm location={data} formActive={true}/> ) : null}
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
