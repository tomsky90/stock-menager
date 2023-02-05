import React, {useState} from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

//components import
import ItemForm from './ItemForm';
import ItemDetails from './ItemDetails';

const LocationDetails = ({location}) => {

  const [message, setMessage] = useState('');
  const [itemMessage, setItemMessage] = useState('');
  const [formActive, setFormActive] = useState(false)
  

  const toggleForm = () => {
    setFormActive(!formActive)
  }

  const handleClick = async () => {
    const response = await fetch('/api/locations/' + location._id, {method: 'DELETE'})

    const json = await response.json()
    setMessage('location: ' + json.title +' deleted')
    setTimeout(() => {
      setMessage('')
      window.location.reload(true)
    },2000)
  }

  

 
  return ( 
    <div className='location-detail-wrapper'>
      <div className='location-detail-title-wrapper'>
        <h3>Bin: {location.title}</h3>
        <div className='icons-wrapper'>
          <button className='add-item-btn' onClick={toggleForm}>Add Item</button>
        </div>
      </div>

      {message && <div className='succes-message'>{message}</div>}
      {itemMessage && <div className='item-message'>{itemMessage}</div>}

      <ItemForm location={location} formActive={formActive}/>
      
      {location.items && location.items.map(item => (
        <ItemDetails key={item._id} item={item} location={location} setItemMessage={setItemMessage}/>
        
      ))}
      
    </div>
   );
}
 
export default LocationDetails;