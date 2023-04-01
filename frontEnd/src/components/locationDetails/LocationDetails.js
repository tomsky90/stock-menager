import React, { useState } from "react";

//components import
import ItemForm from "../itemForm/ItemForm";
import ItemDetails from "../itemDetails/ItemDetails";
import Message from "../message/Message";
//fetchers
import { editItem } from "../../fetchData/FetchData";
//styles
import './locationDetails.css'

const LocationDetails = ({ location }) => {
  // const [message, setMessage] = useState('');
  const [message, setMessage] = useState("");
  const [formActive, setFormActive] = useState(false);
  const [itemCodeInput, setItemCodeInput] = useState("");
  const [itemQtyInput, setItemQtyInput] = useState("");
  const [error, setError] = useState("");
  const [itemExpiry, setItemExpiry] = useState("");

  const toggleForm = () => {
    setFormActive(!formActive);
  };

  const itemQtyOnChange = (e) => {
    if (e.target.value < 0) {
      return;
    } else {
      setItemQtyInput(e.target.value);
    }
  };

  const itemExpiryOnChange = (e) => {
      setItemExpiry(e.target.value.toUpperCase())
  }

  const itemCodeInputOnChange = (e) => {
    setItemCodeInput(e.target.value.toUpperCase())
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

    const data = await editItem(location._id, updatedItem);
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

  // const handleClick = async () => {
  //   const response = await fetch('/api/locations/' + location._id, {method: 'DELETE'})

  //   const json = await response.json()
  //   setMessage('location: ' + json.title +' deleted')
  //   setTimeout(() => {
  //     setMessage('')
  //     window.location.reload(true)
  //   },2000)
  // }

  return (
    <div className="location-detail-wrapper">
      <div className="location-detail-title-wrapper">
        <h3>Bin: {location.title}</h3>
        <div className="icons-wrapper">
          <button className="add-item-btn" onClick={toggleForm}>
            Add Item
          </button>
        </div>
      </div>

      {/* {message && <div className='succes-message'>{message}</div>} */}
      {message && <Message status="succes" message={message} />}
      <ItemForm
        formActive={formActive}
        location={location}
        setMessage={setMessage}
        itemCodeInput={itemCodeInput}
        itemCodeInputOnChange={itemCodeInputOnChange}
        itemExpiry={itemExpiry}
        itemExpiryOnChange={itemExpiryOnChange}
        itemQtyOnChange={itemQtyOnChange}
        itemQtyInput={itemQtyInput}
        handleSubmit={handleSubmit}
        error={error}
      />

      {location.items &&
        location.items.map((item) => (
          <ItemDetails
            key={item._id}
            item={item}
            location={location}
            setMessage={setMessage}
          />
        ))}
    </div>
  );
};

export default LocationDetails;
