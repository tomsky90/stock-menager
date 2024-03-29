import React from "react";
import { Route, Routes } from 'react-router-dom'
//components
import AdminNav from "./components/adminNav/AdminNav";
import AdminMobileNav from "./components/adminNav/adminMobileNav/AdminMobileNav";
import AdminHome from "./components/adminHome/AdminHome";
import CreateBin from "./components/createBin/CreateBin";
import CreateNewItem from "./components/createNewItem/CreateNewItem";
import BinPutAway from "../binPutAway/BinPutAway";
import PickItem from "../pickItem/PickItem";
import BinTransfer from "../binTransferPage/BinTransfer";
import Settings from "./components/settings/Settings";
//css
import './adminPage.css'
const AdminPage = () => {
  return <div className='admin-page'>
    <div className="admin-page__main">
    <AdminMobileNav/>
    <AdminNav/>
    <Routes>
      <Route path="/home" element={<AdminHome/>} />
      <Route path="/create-bin" element={<CreateBin/>} />
      <Route path="/create-new-item" element={<CreateNewItem/>} />
      <Route path="/put-stock-away" element={<BinPutAway/>} />
      <Route path="/pick-item" element={<PickItem/>} />
      <Route path="/bin-transfer" element={<BinTransfer/>} />
      <Route path="/settings" element={<Settings/>}/>
    </Routes>
    </div>
  </div>;
};

export default AdminPage;
