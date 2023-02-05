import React, { useState } from 'react';
import ItemEditForm from './ItemEditForm';
import { FaTrash, FaPen } from 'react-icons/fa';

const ItemDetails = ({item, location, setItemMessage}) => {

  const [itemFormActive, setItemFormActive] = useState(false)


  const deletItem = async (item) => {
    const response = await fetch('/api/locations/items/delete/' + location._id, 
      {
        method: 'PATCH',
        body: JSON.stringify(item),
        headers:{
        'Content-Type': 'application/json'
        }
      }
    )

    if(response.ok) {
      setItemMessage('Item Removed')
      setTimeout(() => {
        setItemMessage('')
        window.location.reload(true)
      },3000)
      
    }

  }

  const toggleItemForm = () => {
    setItemFormActive(!itemFormActive)
    console.log('hi')
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