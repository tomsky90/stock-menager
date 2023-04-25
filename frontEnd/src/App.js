import React from 'react';
import { HashRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";
import { useLocationsContext } from './hooks/useLocationsContext';

//import styles
import './style.css'

//components
import Header from './components/header/Header';
import Home from './components/home/Home';
import AllBinsPage from './pages/allBinsPage/AllBinsPage';
import BinPutAway from './pages/binPutAway/BinPutAway';
import LocationSearch from './pages/locationSearch/LocationSearch';
import SearchForItemPage from './pages/searchForItemPage/SearchForItemPage';
import PickItem from './pages/pickItem/PickItem';
import BinTransfer from './pages/binTransferPage/BinTransfer';
import CreateBin from './pages/createBin/CreateBin';
import Login from './pages/login/Login';
import AdminPage from './pages/admin_Page/AdminPage';
// import CreateUser from './pages/createUser/CreateUser';
import WelcomePage from './pages/welcomePage/WelcomePage';
function App() {
  const {locations} = useLocationsContext()
  const { user } = useAuthContext()
  
  return (
    <HashRouter>
   <div className='app-wrapper'>
    <Header/>
    <Routes>
      <Route path='/' element={!user ? <WelcomePage/> : <Navigate to='/home'/>}/>
      <Route path='/home' element={user?.admin ? <Navigate to='/admin-page'/> : user ? <Home/> : <Navigate to='/'/>}/>
      <Route path='/locations' element={user ? <AllBinsPage locations={locations}/> : <Navigate to='/'/>}/>
      <Route path='/location-search' element={user ? <LocationSearch locations={locations}/> : <Navigate to='/'/>}/>
      <Route path='/location/item/search' element={user ? <SearchForItemPage/> : <Navigate to='/'/>}/>
      <Route path='/location/item/pick-item' element={user ? <PickItem/> : <Navigate to='/'/>}/>
      <Route path='/location/item/bin-putaway' element={user ? <BinPutAway/> : <Navigate to='/'/>}/>
      <Route path='/bin-transfer' element={user ? <BinTransfer/> : <Navigate to='/'/>}/>
      <Route path='/create-bin' element={user ? <CreateBin/> : <Navigate to='/'/>}/>
      <Route path='/admin-page' element={user?.admin ? <AdminPage/> : <Navigate to='/'/>}/>
      {/* <Route path='/create-user' element={<CreateUser/>}/> */}
      <Route path='/login' element={ <Login/> }/>

    </Routes>
    
   </div>
   </HashRouter>
  );
}

export default App;