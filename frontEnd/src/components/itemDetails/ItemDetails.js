import React from "react";
import { Link } from 'react-router-dom'
//styles
import './itemDetails.css'




const ItemDetails = ({ item }) => {

  return (
    <div className="item-wrapper location-list-wrapper">
      <div className="item-wrapper__header">
        <div className="item-wrapper__info-wrapper">
          <p>Item Code: {item.title}</p>
          <p>Item Description: {item.description}</p>
          <p>Item Qty: {item.qty}</p>
          <p>Expiry date: {item.exp}</p>
        </div>
      </div>
      <div className="item-wrapper__link_wrapper">
      <Link to='/bin-transfer'>
        <button className="link-btn">Bin Transfer</button>
      </Link>
      <Link to='/location/item/pick-item'>
        <button className="link-btn">Pick Item</button>
      </Link>
      </div>
      
    </div>
  );
};

export default ItemDetails;