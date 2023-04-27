import React from "react";
import { Link } from "react-router-dom";
//import icons
import { FaHome } from "react-icons/fa";

const AdminNav = () => {
  return ( <nav>
    <Link to="/">
        <div className="header__icon-wrapper">
          <FaHome />
        </div>
      </Link>
  </nav> );
}
 
export default AdminNav;