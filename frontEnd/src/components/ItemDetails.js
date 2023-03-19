import React, { useState } from 'react';
import ItemEditForm from './ItemEditForm';

const ItemDetails = ({ item }) => {

  const [itemFormActive, setItemFormActive] = useState(false)

  const toggleItemForm = () => {
    setItemFormActive(!itemFormActive)
  }

  return ( 
    
      <div className='item-wrapper' >
          
          <div className='item-wrapper__header'>
            <div className="item-wrapper__info-wrapper">
              <p>Item Code: {item.title}</p>
              <p>Item Qty: {item.qty}</p>
              <p>Expiry date: {item.exp}</p>
            </div>
            <div className="item-wrapper__icon_wrapper">
              <button className='add-item-btn' onClick={toggleItemForm}>Edit Item</button>
              <button className='delete-item-btn' onClick={toggleItemForm}>Delete Item</button>
            </div>

          </div>
          
          <ItemEditForm item={item} itemFormActive={itemFormActive}/>
        </div>
    
   );
}
 
export default ItemDetails;