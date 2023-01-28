import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home-page-wrapper'>
      <Link to='/location-form'>
        <div className='tile tile-1'>Add Location</div>
      </Link>
      <Link to='/location-search'>
        <div className='tile tile-2'>Serarch For Location</div>
      </Link>
      <Link to='/location/item/search'>
        <div className='tile tile-3'>Search For Item</div>
      </Link>
      <Link to='/location/item/pick-item'>
        <div className='tile tile-4'>Pick Item</div>
      </Link>
      
      <Link to='/locations'>
        <div className='tile tile-5'>All Locations</div>
      </Link>
    </div>
  )
}

export default Home