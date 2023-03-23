import React, { useState } from "react";
//update Item
import { editItem } from "../fetchData/FetchData";
//components
import Message from "./message/Message";

const ItemForm = ({ formActive, location, setActiveStep, setMessage }) => {
  const [itemCodeInput, setItemCodeInput] = useState("");
  const [itemQtyInput, setItemQtyInput] = useState("");
  const [error, setError] = useState("");
  const [itemExpiry, setItemExpiry] = useState("");

  const itemQtyOnChange = (e) => {
    if (e.target.value < 0) {
      return;
    } else {
      setItemQtyInput(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (itemCodeInput.length < 1 || itemQtyInput === "") {
      setError("Enter Valid Part Number And Qty!");
      return;
    }

    const updatedItem = {
      title: itemCodeInput,
      qty: itemQtyInput,
      exp: itemExpiry,
    };

    const data = await editItem(location._id, updatedItem);
    if (!data.ok) {
      setError(data.error);
    }
    if (data.ok) {
      setItemCodeInput("");
      setItemQtyInput("");
      setError(null);
      setItemExpiry("");
      setActiveStep(3)
      setMessage("Item Succesfully Added");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={formActive ? "item-form active" : "item-form"}
    >
      <div className="item-form-input-wrapper">
        <label htmlFor="item-code">Item Code:</label>
        <input
          type="text"
          value={itemCodeInput}
          id="item-code"
          onChange={(e) => {
            setItemCodeInput(e.target.value.toUpperCase());
          }}
        />
      </div>
      <div className="item-form-input-wrapper">
        <label htmlFor="item-exp">Expiry Date:</label>
        <input
          type="text"
          value={itemExpiry}
          id="item-exp"
          onChange={(e) => {
            setItemExpiry(e.target.value);
          }}
        />
      </div>
      <div className="item-form-input-wrapper">
        <label htmlFor="item-qty">Item Qty:</label>
        <input type="number" value={itemQtyInput} onChange={itemQtyOnChange} />
      </div>
      {error && <Message status='error' message={error}/>}

      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
