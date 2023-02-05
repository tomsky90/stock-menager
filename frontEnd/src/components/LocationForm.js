import React, { useState } from 'react';

const LocationForm = () => {

  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()

    const location = {title: title};

    const response = await fetch('/api/locations', {
      method: 'POST',
      body: JSON.stringify(location),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if(!response.ok) {
      setError(json.error)
    }
    if(response.ok) {
      setTitle('')
      setError(null)
      setMessage('Location ' + location.title + ' added')
      setTimeout(() => {
        setMessage('')
      },2000)
    }
  }

  return ( 
    <form className='location-form' onSubmit={handleSubmit}>
      {message && <div className='succes-message'>{message}</div>}
      <label>Bin Name:</label>
      <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value.toUpperCase() )}}/>
      {error && <div className='error-message'>
        {error}
      </div>}

      <button type='submit' className='submit-location-btn'>Add Bin</button>

    </form>
  );
}
 
export default LocationForm;