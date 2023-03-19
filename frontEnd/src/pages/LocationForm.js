import React, { useState } from 'react';
//components
import SingleInputForm from '../components/singleInputForm/SingleInputForm';
//create new bin
import { addNewBin } from '../fetchData/FetchData';

const LocationForm = () => {

  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()

    const location = {title: title};

    const data = await addNewBin(location);
    console.log(data)
    if (data.error) {
      setError(data.error);
    } else {
      setTitle('')
        setError(null)
        setMessage('Location ' + location.title + ' added')
        setTimeout(() => {
          setMessage('')
        },2000);
    }

    // if(!response.ok) {
    //   setError(json.error)
    // }
    // if(response.ok) {
    //   setTitle('')
    //   setError(null)
    //   setMessage('Location ' + location.title + ' added')
    //   setTimeout(() => {
    //     setMessage('')
    //   },2000)
    // }
  }

  return ( <div className='add-bin-page'>
    {message && <div className='succes-message'>{message}</div>}
    {error && <div className='error-message'>
       {error}
     </div>}
    <SingleInputForm
    handelSubmit={handleSubmit} setInputValue={setTitle} inputValue={title} type='text' title='Enter Bin Name:'
    />
  </div>
    // <form className='location-form' onSubmit={handleSubmit}>
    //   {message && <div className='succes-message'>{message}</div>}
    //   <label>Bin Name:</label>
    //   <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value.toUpperCase() )}}/>
    //   {error && <div className='error-message'>
    //     {error}
    //   </div>}

    //   <button type='submit' className='submit-location-btn'>Add Bin</button>

    // </form>
  );
}
 
export default LocationForm;