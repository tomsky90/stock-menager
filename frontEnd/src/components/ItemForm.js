import React, { useState } from "react";
//update Item
import { editItem } from "../fetchData/FetchData";

const ItemForm = ({ formActive, location }) => {
  const [itemCodeInput, setItemCodeInput] = useState("");
  const [itemQtyInput, setItemQtyInput] = useState("");
  const [error, setError] = useState("");
  const [itemMessage, setItemMessage] = useState("");
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
      setItemMessage("Item Succesfully Added");
      setTimeout(() => {
        setItemMessage("");
        window.location.reload(true);
      }, 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={formActive ? "item-form active" : "item-form"}
    >
      {itemMessage && <div className="item-message">{itemMessage}</div>}
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
      {error && <div className="error-message">{error}</div>}

      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
