import React, { useState, useEffect } from 'react';
import LocationDetails from '../components/locationDetails/LocationDetails';

const LocationSearch = () => {

  const [locations, setLocations] = useState();
  const [filterdLocations, setFilterdLocations] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('')

  useEffect(() => {

   const fetchLocations = async () => {
    const response = await fetch('/api/locations/')
    const data = await response.json()
    setLocations(data)
   }

   fetchLocations()
  },[])

  const filterLocations = () => {

    if(inputValue.length < 1) {
      setError('Enter Valid Location!')
      return
    }
    
    setError('')

    const searchText = inputValue.toLowerCase()
    setFilterdLocations(locations.filter(location => location.title.toLowerCase().includes(searchText)))
    setInputValue('')
  }

  return ( 
    <div className='location-search-page'>
      <div className='serch-location'>
        <label htmlFor="input">Search For Bin</label>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value.toUpperCase())}/>

        <button onClick={filterLocations}>Search</button>
        {error && <div className='error-message'>
        {error}
      </div>}
      </div>
      <div className='filterd-locations-wrapper'>
      {filterLocations && filterdLocations.map(location => (
        <LocationDetails location={location} key={location._id}/>
      ))}
      </div>
    </div>
   );
}
 
export default LocationSearch;