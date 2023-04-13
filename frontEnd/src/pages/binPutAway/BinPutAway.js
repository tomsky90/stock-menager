import React, { useState } from "react";
//components
import ItemForm from "../../components/itemForm/ItemForm";
import SingleInputForm from "../../components/singleInputForm/SingleInputForm";
import StepCounter from "../../components/stepCounter/StepCounter";
import ItemsList from "../../components/itemsList/ItemsList";
import Message from "../../components/message/Message";
//get data
import { getData, putItemAway } from "../../fetchData/FetchData";
//useAuthContext hook
import { useAuthContext } from "../../hooks/useAuthContext";
//styles
import "./binPutAway.css";

const BinPutAway = () => {
  const [data, setData] = useState();
  const [inputValue, setInputValue] = useState("");
  const [itemCodeInput, setItemCodeInput] = useState("");
  const [itemExpiryInput, setItemExpiryInput] = useState("");
  const [itemQtyInput, setItemQtyInput] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const { user } = useAuthContext();

  const itemCodeInputOnChange = (e) => {
    setItemCodeInput(e.target.value.toUpperCase());
  };

  const itemExpiryOnChange = (e) => {
    setItemExpiryInput(e.target.value.toUpperCase());
  };

  const itemQtyOnChange = (e) => {
    setItemQtyInput(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.length < 1) {
      setError("Enter valid bin number!");
      return;
    }

    const data = await getData(inputValue, user);
    if (data.error) {
      setData(null);
      setError(data.error);
    } else {
      setData(data);
      setError(null);
      setActiveStep(2);
    }
  };

  const pushItem = async (e) => {
    e.preventDefault();
    if (
      itemCodeInput.length <= 0 ||
      itemExpiryInput.length <= 0 ||
      itemQtyInput <= 0
    ) {
      return setError("Please fill in all fields.");
    }
    const item = {
      title: itemCodeInput,
      qty: itemQtyInput,
      exp: itemExpiryInput,
    };
    const response = await putItemAway(data._id, item, user);
    const json = await response.json();

    if (response.ok) {
      setActiveStep(3);
      setMessage(`Bin: ${json.title} updated succesfully`);
      setTimeout(() => {
        const resetData = async () => {
          const data = await getData(inputValue, user);
          if (data.error) {
            setData(null);
            setError(data.error);
          } else {
            setData(data);
            setError(null);
            setActiveStep(1);
            setInputValue('');
            setItemCodeInput('');
            setItemExpiryInput('');
            setItemQtyInput('');
            setMessage('')
          }
        };
        resetData()
      }, 3000);
    }
  };

  return (
    <div className="bin-put-away-page">
      <h1>Put Stock Away</h1>
      <StepCounter steps={3} activeStep={activeStep} />
      {error && <Message status="error" message={error} />}
      {message && <Message status="succes" message={message} />}
      {activeStep === 1 ? (
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
      {activeStep === 2 ? (
        <ItemForm
          handleSubmit={pushItem}
          formActive={true}
          itemCodeInput={itemCodeInput}
          itemCodeInputOnChange={itemCodeInputOnChange}
          itemExpiryInput={itemExpiryInput}
          itemExpiryOnChange={itemExpiryOnChange}
          itemQtyInput={itemQtyInput}
          itemQtyOnChange={itemQtyOnChange}
        />
      ) : null}
      {data && <ItemsList data={data} />}
    </div>
  );
};

export default BinPutAway;
