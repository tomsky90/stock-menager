import React, { useState } from 'react';

const ItemEditForm = ({itemFormActive, item}) => {

  const [itemCodeInput, setItemCodeInput] =  useState(item.title);
  const [itemQtyInput, setItemQtyInput] =  useState(item.qty);
  const [itemExpDateInput, setItemExpDateInput] =  useState(item.exp);
  const [itemMessage, setItemMessage] = useState('');
  const [error, setError] =  useState('');

  const onSubmit = async (e) => {
    e.preventDefault()

    if(itemCodeInput.length < 1 || itemQtyInput === '') {
      setError('Enter Valid Part Number And Qty!')
      return
    }

    const updatedItem = {title: itemCodeInput, qty: itemQtyInput, exp: itemExpDateInput};

    const response = await fetch('/api/locations/items/edit/' + item._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedItem),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    console.log(item)

    if(!response.ok) {
      setError(json.error)
    }
    if(response.ok) {
      setItemCodeInput('')
      setItemQtyInput('')
      setError(null)
      setItemExpDateInput('')
      setItemMessage('Item Succesfully Added')
      setTimeout(() => {
        setItemMessage('');
        window.location.reload(true)
      }, 2000)
    }
  }


  return ( 
    <form onSubmit={onSubmit} className={itemFormActive ? 'item-edit-form active' : 'item-edit-form'}>
      {itemMessage && <div className='item-message'>{itemMessage}</div>}
      <h3>Edit Item:</h3>
      <div className='item-edit-form__item-wrapper'>
        <div className='item-edit-form-input-wrapper'>
          <label htmlFor="item-code">Item Code:</label>
          <input type="text" value={itemCodeInput} id='item-code' onChange={(e) => {setItemCodeInput(e.target.value.toUpperCase())}}/>
        </div>

        <div className='item-edit-form-input-wrapper'>
          <label htmlFor="item-qty">Item Qty:</label>
          <input type="text" value={itemQtyInput} id='item-qty' onChange={(e) => {setItemQtyInput(e.target.value)}}/>
        </div>

        <div className='item-edit-form-input-wrapper'>
          <label htmlFor="item-exp-date-input">Expiry Date:</label>
          <input type="text" value={itemExpDateInput} id='item-exp-date-input' onChange={(e) => {setItemExpDateInput(e.target.value)}}/>
        </div>
        <button type="submit">Submit</button>
      </div>
      
      {error && <div className='error-message'>
        {error}
      </div>}
    </form>
   );
}
 
export default ItemEditForm;