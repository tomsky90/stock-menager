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
//css
import "./adminNav.css";

const AdminNav = () => {
 
  return (
    <nav className="admin-page__nav">
      <NavLink to="/admin-page/home">
        <div className="admin-page__nav__icon-wrapper">
          <FaHome /> <span>Home</span>
        </div>
      </NavLink>
      <NavLink to="/admin-page/create-bin">
        <div className="admin-page__nav__icon-wrapper">
          <SiLinuxcontainers /> <span>Add new bin</span>
        </div>
      </NavLink>
      <NavLink to="/admin-page/create-new-item">
        <div className="admin-page__nav__icon-wrapper">
          <VscNewFile /> <span>Add new Item</span>
        </div>
      </NavLink>
      <NavLink to="/admin-page/put-stock-away">
        <div className="admin-page__nav__icon-wrapper">
          <BsCloudUpload /> <span>Put item away</span>
        </div>
      </NavLink>
      <NavLink to="/admin-page/pick-item">
        <div className="admin-page__nav__icon-wrapper">
          <BsBasket /> <span>Pick item</span>
        </div>
      </NavLink>
      <NavLink to="/admin-page/bin-transfer">
        <div className="admin-page__nav__icon-wrapper">
          <BiTransfer /> <span>Transfer bin</span>
        </div>
      </NavLink>
      <NavLink to="/admin-page/settings">
        <div className="admin-page__nav__icon-wrapper">
          <FiSettings /> <span>Settings</span>
        </div>
      </NavLink>
    </nav>
  );
};

export default AdminNav;
