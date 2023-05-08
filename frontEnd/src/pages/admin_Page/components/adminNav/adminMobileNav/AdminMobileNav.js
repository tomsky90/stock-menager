import React from "react";
import { Link } from "react-router-dom";
//import icons
import { FaHome } from "react-icons/fa";
import { SiLinuxcontainers } from "react-icons/si";
import { VscNewFile } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
//context
import { useAppContext } from "../../../../../hooks/useAppContext";
//css
import "./adminMobileNav.css";

const AdminMobileNav = () => {
  const {mobileNavActive, dispatch} = useAppContext()

  const toggleNav = () => {
    if(mobileNavActive) {
      dispatch({type: 'NOTACTIVE', payload: false})
    }
    if(!mobileNavActive) {
      dispatch({type: 'ACTIVE', payload: true})
    }
  }

  return (
    <nav className={mobileNavActive ? `admin-page__mobile-nav active` : `admin-page__mobile-nav`}>
      <Link onClick={toggleNav} to="/admin-page/home">
        <div className="admin-page__mobile-nav__icon-wrapper">
          <FaHome /> <span>Home</span>
        </div>
      </Link>
      <Link onClick={toggleNav} to="/admin-page/create-bin">
        <div className="admin-page__mobile-nav__icon-wrapper">
          <SiLinuxcontainers /> <span>Add new bin</span>
        </div>
      </Link>
      <Link onClick={toggleNav} to="/admin-page/create-new-item">
        <div className="admin-page__mobile-nav__icon-wrapper">
          <VscNewFile /> <span>Add new Item</span>
        </div>
      </Link>
      <Link onClick={toggleNav} to="/admin-page/settings">
        <div className="admin-page__mobile-nav__icon-wrapper">
          <FiSettings /> <span>Settings</span>
        </div>
      </Link>
    </nav>
  );
};

export default AdminMobileNav;
