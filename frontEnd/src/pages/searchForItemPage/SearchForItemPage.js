import React, { useState } from 'react';
//components
import Message from '../../components/message/Message';
import SingleInputForm from '../../components/singleInputForm/SingleInputForm';
import LocationsList from '../../components/locationsList/LocationsList';
//hooks
import { useAuthContext } from '../../hooks/useAuthContext';
//fetchers
import { getSingleItem } from '../../fetchData/FetchData';
//styles
import './searchForItemPage.css';

const SearchForItemPage = () => {

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [data, setData] = useState([])
  const [itemQty, setItemQty] = useState('')
  const [itemName, setItemName] = useState('')
  const { user } = useAuthContext()

  //total qty for searched item
  const addQty = (locations) => {
    let count = 0
    for(const location of locations) {
      for(const item of location.items) {
        if(item.title === inputValue.trim()){
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
    
    const response = await getSingleItem(inputValue, user)

    const json = await response.json()

    if(!response.ok) {
      setError(json.error)
    }
    if(response.ok) {
      setError(null)
      setData(json)
      setItemName(inputValue)
      addQty(json)
      setInputValue('')
    }

  }

  return ( 
    <div className='item-search-wrapper'>
      <h1>Search For Item</h1>
      <h3> {itemQty && <div className='item-search__total-qty'>Found: {itemName} <br/> Total on Stock: {itemQty}</div>}</h3>
      {error && <Message status='error' message={error}/>}
      {<SingleInputForm
        handelSubmit={handelSubmit}
        setInputValue={setInputValue}
        inputValue={inputValue}
        type='text'
        title='Enter Item Code:'
        btnText='Search'
      />}
      <LocationsList locations={data}/>
    </div>
   );
}
 
export default SearchForItemPage;