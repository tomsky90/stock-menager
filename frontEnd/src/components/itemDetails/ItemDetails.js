import React, { useState } from "react";
//components
import Message from "../message/Message";
import ItemForm from "../itemForm/ItemForm";
//fetchers
import { editItem, deleteItem } from "../../fetchData/FetchData";
//styles
import './itemDetails.css'
//auth context
import { useAuthContext } from "../../hooks/useAuthContext";

const ItemDetails = ({ item, setMessage, location }) => {
  const [itemFormActive, setItemFormActive] = useState(false);
  const [itemCodeInput, setItemCodeInput] = useState("");
  const [itemQtyInput, setItemQtyInput] = useState("");
  const [error, setError] = useState("");
  const [itemExpiry, setItemExpiry] = useState("");
  const { user } = useAuthContext()

  const itemQtyOnChange = (e) => {
    if (e.target.value < 0) {
      return;
    } else {
      setItemQtyInput(e.target.value);
    }
  };

  const itemExpiryOnChange = (e) => {
      setItemExpiry(e.target.value)
  }

  const itemCodeInputOnChange = (e) => {
    setItemCodeInput(e.target.value)
  }

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

    const data = await editItem(item._id, updatedItem, user);
    if (!data.ok) {
      setError(data.error);
    }
    if (data.ok) {
      setItemCodeInput("");
      setItemQtyInput("");
      setError(null);
      setItemExpiry("");
      setMessage("Item Succesfully Added");
    }
  };

  const removeItem = async () => {
    const response = await deleteItem(item, location._id, user);
    if(response.ok) {
      setMessage(`Item: ${item.title} succesfuly deleted!`)
    }
  } 

  const toggleItemForm = () => {
    setItemFormActive(!itemFormActive);
  };

  return (
    <div className="item-wrapper">
      <div className="item-wrapper__header">
        <div className="item-wrapper__info-wrapper">
          <p>Item Code: {item.title}</p>
          <p>Item Qty: {item.qty}</p>
          <p>Expiry date: {item.exp}</p>
        </div>
        <div className="item-wrapper__icon_wrapper">
          <button className="add-item-btn" onClick={toggleItemForm}>
            Edit Item
          </button>
          <button className="delete-item-btn" onClick={()=> {removeItem()}}>
            Delete Item
          </button>
        </div>
      </div>
      {error && <Message status="error" message={error} />}
      <ItemForm
        formActive={itemFormActive}
        itemCodeInput={itemCodeInput}
        itemCodeInputOnChange={itemCodeInputOnChange}
        itemExpiry={itemExpiry}
        itemExpiryOnChange={itemExpiryOnChange}
        itemQtyOnChange={itemQtyOnChange}
        itemQtyInput={itemQtyInput}
        handleSubmit={handleSubmit}
        error={error}
      />
    </div>
  );
};

export default ItemDetails;