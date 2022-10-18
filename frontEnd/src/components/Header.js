import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Header = () => {
  return ( 
    <header>
      <Link to='/'>
        <div className='home-icon-wrapper'>
          <FaHome />
        </div>
      </Link>
        <div className='logo-wrapper'><h1>Stock Manager</h1></div>
      
    </header>
   );
}
 
export default Header
