import React, { useState } from "react";
//authContext hook
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLocationsContext } from '../../hooks/useLocationsContext';
//components import
import ItemForm from "../itemForm/ItemForm";
import ItemDetails from "../itemDetails/ItemDetails";
import Message from "../message/Message";
//fetchers
import { putItemAway, getSingleBin } from "../../fetchData/FetchData";
//styles
import './locationDetails.css'

const LocationDetails = ({ location, isSingleBin }) => {
  const [message, setMessage] = useState("");
  const [formActive, setFormActive] = useState(false);
  const [itemCodeInput, setItemCodeInput] = useState("");
  const [itemQtyInput, setItemQtyInput] = useState("");
  const [error, setError] = useState("");
  const [itemExpiry, setItemExpiry] = useState("");
  const { user } = useAuthContext();
  const { dispatch } = useLocationsContext();

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

  //if item don't exist create new item else add to item
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

    const data = await putItemAway(location._id, updatedItem, user);
    if (!data.ok) {
      setError(data.error);
    }
    if (data.ok) {
      setItemCodeInput("");
      setItemQtyInput("");
      setError(null);
      setItemExpiry("");
      setMessage("Item Succesfully Added");
      setTimeout(() => {
        const getAllData = async () => {
          //if serching for bin, get single bin data
          if(isSingleBin) {
            const response = await getSingleBin(location.title, user) 
            const json = await response.json()
            if(!response.ok) {
              setError(json.error)
            }
            if(response.ok) {
              const arr = []
              arr.push(json)
              setMessage('')
              setFormActive(false)
              dispatch({type: 'SET_LOCATIONS', payload: arr})
            }
          }
          
        }
        getAllData()
      },1000)
    }
  };

  return (
    <div className="location-detail-wrapper">{console.log(isSingleBin)}
      <div className="location-detail-title-wrapper">
        <h3>Bin: {location.title}</h3>
        <div className="icons-wrapper">
          <button className="add-item-btn" onClick={toggleForm}>
            Add Item
          </button>
        </div>
        {error && <Message status='error' message={error}/>}
      </div>

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
            isSingleBin={isSingleBin}
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
