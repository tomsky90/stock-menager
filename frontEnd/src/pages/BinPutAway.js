import React, { useState } from "react";
//components
import ItemForm from "../components/ItemForm";
import SingleInputForm from "../components/singleInputForm/SingleInputForm";
import StepCounter from "../components/stepCounter/StepCounter";
import ItemsList from "../components/itemsList/ItemsList";
import Message from "../components/message/Message";
//get data
import { getData } from "../fetchData/FetchData";

const BinPutAway = () => {
  const [data, setData] = useState();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.length < 1) {
      setError("Enter valid bin number!");
      return;
    }

    const data = await getData(inputValue);
    if (data.error) {
      setData(null);
      setError(data.error);
    } else {
      setData(data);
      setError(null)
      setActiveStep(2);
    }
  };

  return (
    <div className="bin-put-away-page">
      <h1>Put Stock Away</h1>
      <StepCounter steps={3} activeStep={activeStep} />
      {activeStep === 1 ? (
        <SingleInputForm
          handelSubmit={handelSubmit}
          setInputValue={setInputValue}
          inputValue={inputValue}
          error={error}
          type="text"
          title="Select Bin"
        />
      ) : null}
      {error && <Message status='error' message={error}/>}
      {message && <Message status='succes' message={message}/>}
      {activeStep === 2 ? <ItemForm setMessage={setMessage} setActiveStep={setActiveStep} location={data} formActive={true} /> : null}
      {data && ( <ItemsList data={data}/>
        
      )}
    </div>
  );
};

export default BinPutAway;
