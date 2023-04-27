import React, { useState } from "react";
import { Link } from "react-router-dom";
//import icons
import { FaHome } from "react-icons/fa";
//styles
import "./adminHeader.css";

const AdminHeader = () => {
  const [searchInputValue, setSearchInputValue] = useState('')
  return (
    <header className="admin-header">
      <div className="admin-header__search-bar">
        <form>
          <label>
            Search for item:
            <input value={searchInputValue} onChange={(e) => {setSearchInputValue(e.target.value.toUpperCase())}} type="text" placeholder="Search" />
          </label>
        </form>
      </div>
    </header>
  );
};

export default AdminHeader;
