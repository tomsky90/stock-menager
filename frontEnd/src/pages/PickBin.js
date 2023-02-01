import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PickBin = () => {
  
  const { item, bin} = useParams()
  const [inputValue, setInputValue] = useState()
  const [data, setData] = useState()
  const [error, setError] = useState()

useEffect(() => {
  const fetchData = async () => {
    try{
      const response = await fetch(`/api/locations/${bin}`)
      const json = await response.json()
      if(!response.ok) {
        setError(json.error)
      }
      if(response.ok) {
        setError(null)
        setData(json)
      }
    } catch(err) {

    }
  }

  fetchData()
}, [])
  return ( 
    <div className='pick-bin-page'>
      <form className='pick-bin-page__form'>
        <div className='pick-bin-page__form-input-group'>
          <label htmlFor='input'>Quantity To Be Picked:</label>
          <input id='input' value={inputValue} onChange={(e) => {setInputValue(e.target.value)}}/>
        </div>
      </form>
      {console.log(data)}
    </div> );
}
 
export default PickBin;