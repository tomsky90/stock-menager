import React from "react";
import { NavLink } from "react-router-dom";
//import icons
import { FaHome } from "react-icons/fa";
import { SiLinuxcontainers } from "react-icons/si";
import { VscNewFile } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
import { BsCloudUpload } from "react-icons/bs";
import { BsBasket } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
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
      <NavLink onClick={toggleNav} to="/admin-page/home">
        <div className="admin-page__mobile-nav__icon-wrapper">
          <FaHome /> <span>Home</span>
        </div>
      </NavLink>
      <NavLink onClick={toggleNav} to="/admin-page/create-bin">
        <div className="admin-page__mobile-nav__icon-wrapper">
          <SiLinuxcontainers /> <span>Add new bin</span>
        </div>
      </NavLink>
      <NavLink onClick={toggleNav} to="/admin-page/create-new-item">
        <div className="admin-page__mobile-nav__icon-wrapper">
          <VscNewFile /> <span>Add new Item</span>
        </div>
      </NavLink>
      <NavLink onClick={toggleNav} to="/admin-page/put-stock-away">
        <div className="admin-page__nav__icon-wrapper">
          <BsCloudUpload /> <span>Put item away</span>
        </div>
      </NavLink>
      <NavLink onClick={toggleNav} to="/admin-page/pick-item">
        <div className="admin-page__nav__icon-wrapper">
          <BsBasket /> <span>Pick item</span>
        </div>
      </NavLink>
      <NavLink onClick={toggleNav} to="/admin-page/bin-transfer">
        <div className="admin-page__nav__icon-wrapper">
          <BiTransfer /> <span>Transfer bin</span>
        </div>
      </NavLink>
      <NavLink onClick={toggleNav} to="/admin-page/settings">
        <div className="admin-page__mobile-nav__icon-wrapper">
          <FiSettings /> <span>Settings</span>
        </div>
      </NavLink>
    </nav>
  );
};

export default AdminMobileNav;
