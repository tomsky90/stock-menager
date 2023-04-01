import React from 'react';
//import icons
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
//styles
import './header.css'

const Header = () => {
  return ( 
    <header>
      <Link to='/'>
        <div className='header__icon-wrapper'>
          <FaHome />
        </div>
      </Link>
        <div className='header__logo-wrapper'><h1 className='header__logo-wrapper__heading'>Stock Manager</h1></div>
      
    </header>
   );
}
 
export default Header
