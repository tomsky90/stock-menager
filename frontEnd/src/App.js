import React, {useEffect, useState} from 'react';
import { HashRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";

//import styles
import './style.css'

//components
import Header from './components/header/Header';
import Home from './components/home/Home';
import LocationsList from './components//locationsList/LocationsList';
import BinPutAway from './pages/binPutAway/BinPutAway';
import LocationSearch from './pages/locationSearch/LocationSearch';
import SearchForItemPage from './pages/searchForItemPage/SearchForItemPage';
import PickItem from './pages/pickItem/PickItem';
import BinTransfer from './pages/binTransferPage/BinTransfer';
import CreateBin from './pages/createBin/CreateBin';
import Login from './pages/login/Login';
// import CreateUser from './pages/createUser/CreateUser';
import WelcomePage from './pages/welcomePage/WelcomePage';
function App() {

  const [locations, setLocations] = useState([]);
  const { user } = useAuthContext()
  

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch('https://stock-menager-back-end.onrender.com/api/locations', {headers: {
        'Authorization': `Bearer ${user.token}`
      }})
      const data = await response.json()
      setLocations(data)
    }

    if(user) {
       fetchLocations()
    }

  },[user])
  return (
    <HashRouter>
   <div className='app-wrapper'>
    <Header/>
    <Routes>
      <Route path='/' element={!user ? <WelcomePage/> : <Navigate to='/home'/>}/>
      <Route path='/home' element={user ? <Home/> : <Navigate to='/'/>}/>
      <Route path='/locations' element={user ? <LocationsList/> : <Navigate to='/'/>}/>
      <Route path='/location-search' element={user ? <LocationSearch locations={locations}/> : <Navigate to='/'/>}/>
      <Route path='/location/item/search' element={user ? <SearchForItemPage/> : <Navigate to='/'/>}/>
      <Route path='/location/item/pick-item' element={user ? <PickItem/> : <Navigate to='/'/>}/>
      <Route path='/location/item/bin-putaway' element={user ? <BinPutAway/> : <Navigate to='/'/>}/>
      <Route path='/bin-transfer' element={user ? <BinTransfer/> : <Navigate to='/'/>}/>
      <Route path='/create-bin' element={user ? <CreateBin/> : <Navigate to='/'/>}/>
      {/* <Route path='/create-user' element={<CreateUser/>}/> */}
      <Route path='/login' element={ <Login/> }/>

    </Routes>
    
   </div>
   </HashRouter>
  );
}

export default App;