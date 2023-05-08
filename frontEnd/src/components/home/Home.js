import React from 'react';
import { Link } from 'react-router-dom';
//styles
import './home.css'

const Home = () => {
  return (
    <div className='home__page-wrapper'>
      <Link to='/location-search'>
        <div>Serarch For Bin</div>
      </Link>
      <Link to='/location/item/search'>
        <div>Search For Item</div>
      </Link>
      <Link to='/location/item/pick-item'>
        <div>Pick Item</div>
      </Link>
      <Link to='/location/item/bin-putaway'>
        <div>Bin putaway</div>
      </Link>
      <Link to='/locations'>
        <div>All Bins</div>
      </Link>
      <Link to='/bin-transfer'>
        <div>Bin Transfer</div>
      </Link>
    </div>
  )
}

export default Home