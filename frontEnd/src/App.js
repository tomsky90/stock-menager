import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
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
import CreateUser from './pages/createUser/CreateUser';
import WelcomePage from './pages/welcomePage/WelcomePage';
function App() {

  const [locations, setLocations] = useState([]);
  const { user } = useAuthContext()
  

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch('/api/locations', {headers: {
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
    <BrowserRouter>
   <div className='app-wrapper'>
    <Header/>
    <Routes>
      <Route path='/' element={<WelcomePage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/locations' element={<LocationsList locations={locations}/>}/>
      <Route path='/location-search' element={<LocationSearch locations={locations}/>}/>
      <Route path='/location/item/search' element={<SearchForItemPage/>}/>
      <Route path='/location/item/pick-item' element={<PickItem/>}/>
      <Route path='/location/item/bin-putaway' element={<BinPutAway/>}/>
      <Route path='/bin-transfer' element={<BinTransfer />}/>
      <Route path='/create-bin' element={<CreateBin/>}/>
      <Route path='/create-user' element={<CreateUser/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    
   </div>
   </BrowserRouter>
  );
}

export default App;