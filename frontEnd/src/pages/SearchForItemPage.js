import React, { useState } from 'react';
import LocationsList from '../components/LocationsList';

const SearchForItemPage = () => {

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [data, setData] = useState([])
  const [itemQty, setItemQty] = useState('')

  //total qty for searched item
  const addQty = (locations) => {
    let count = 0
    for(const location of locations) {
      for(const item of location.items) {
        if(item.title === inputValue){
          count += item.qty
        }
      }
    }
    setItemQty(count)
  }

  const handelSubmit = async (e) => {
    e.preventDefault()

    setData([])
    setItemQty('')

    if(inputValue.length < 1) {
      setError('Enter Valid Part Number!')
      return
    }
    
    const response = await fetch('/api/locations/find-items/' + inputValue)

    const json = await response.json()

    if(!response.ok) {
      setError(json.error)
    }
    if(response.ok) {
      setError(null)
      setData(json)
      addQty(json)
      setInputValue('')
    }

  }

  return ( 
    <div className='item-search-wrapper'>
      <form onSubmit={handelSubmit} className='item-search__form'>
        <label htmlFor="item-input">Part Number:</label>
        <input type="text" value={inputValue} onChange={(e) => {setInputValue(e.target.value.toUpperCase())}}  id='item-input'/>
        <button type="submit">Search</button>
        {error && <div className='error-message'>
        {error}
      </div>}
      </form>
      {itemQty && <div className='item-search__total-qty'>Total on Stock: {itemQty}</div>}
      <LocationsList locations={data}/>
    </div>
   );
}
 
export default SearchForItemPage;