import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
const SelectBin = () => {
  let {item} = useParams()
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [data, setData] = useState([])
  const [itemQty, setItemQty] = useState('')


const selectInput = (bin) => {
  setInputValue(bin)
}

//calculate total qty on stock
  const addQty = (locations) => {
    let count = 0
    for(const location of locations) {
      for(const part of location.items) {
        if(part.title === item){
          count += part.qty
        }
      }
    }
    setItemQty(count)
  }


  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/locations/find-items/' + item)

    const json = await response.json()

    if(!response.ok) {
      setError(json.error)
    }
    if(response.ok) {
      setError(null)
      setData(json)
      addQty(json)
      // navigate(`/location/item/pick-item/select-bin/${inputValue}`, {replace: true})
      
    }
    }

    getData()
  },[])

  const handelSubmit = async(e) => {
    e.preventDefault()

    setData([])
    setItemQty('')

    if(inputValue.length < 1) {
      setError('Enter Valid Part Number!')
      return
    }
    
    const response = await fetch('/api/locations/' + inputValue)

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
   <div className='select-bin-page'>
      <form onSubmit={handelSubmit} className='item-search__form'>
        <label htmlFor="item-input">Select Bin:</label>
        <input type="text" value={inputValue} onChange={(e) => {setInputValue(e.target.value.toUpperCase())}}  id='item-input'/>
        <button type="submit">Search</button>
        {error && <div className='error-message'>
        {error}
      </div>}
      </form>
      {itemQty && <div className='item-search__total-qty'>Total on Stock: {itemQty}</div>}
   <div className='bins-list'>
    <div className='bins-list__header'>
      <p>Bin</p>
      <p>part</p>
      <p>qty</p>
    </div>
    {data.map(loc => (<div onClick={() => {selectInput(loc.title)}} className='bins-list__bin' key={loc._id}>
      <p>{loc.title}</p>
      {loc.items.map(part => {
        if(part.title === item) {
          return (<React.Fragment key={part._id}> <p key={loc._id}>{part.title}</p> <p key={part._id}>{part.qty}</p></React.Fragment>
          )
        }
      })}
    </div>))}
   </div>
   </div>
  );
}
 
export default SelectBin;