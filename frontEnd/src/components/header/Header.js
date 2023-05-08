import React from "react";
import { Link } from "react-router-dom";
//import icons
import { FaHome } from "react-icons/fa";
import { GiHamburgerMenu } from 'react-icons/gi';
//styles
import "./header.css";
//hooks
import { useLogout } from "../../hooks/useLogout";
//context
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAppContext } from "../../hooks/useAppContext";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const {mobileNavActive, dispatch} = useAppContext()
  
  const toggleNav = () => {
    if(mobileNavActive) {
      dispatch({type: 'NOTACTIVE', payload: false})
    }
    if(!mobileNavActive) {
      dispatch({type: 'ACTIVE', payload: true})
    }
  }

  const handleClick = () => {
    logout();
  };
  return (
    <header className="header">
      <Link to="/">
        <div className="header__icon-wrapper">
          <FaHome />
        </div>
      </Link>
      <div className="header__logo-wrapper">
        <h1 className="header__logo-wrapper__heading">Stock Manager</h1>
        {user && (
          <div className="header__loging__btns">
            <span>{user.email}</span>
            <button className="header__logout-btn" onClick={handleClick}>
              Log out
            </button>
          </div>
        )}
      </div>
      <div onClick={toggleNav} className="header__icon-wrapper__hamburger-icon">
         {user?.admin ? (<GiHamburgerMenu />) : null} 
        </div>
    </header>
  );
};

export default Header;
