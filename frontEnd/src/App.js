import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

//import styles
import './style.css'

//components
import Header from './components/Header';
import Home from './components/Home';
import LocationsList from './components/LocationsList';
import LocationForm from './components/LocationForm';
import LocationSearch from './pages/LocationSearch';
import SearchForItemPage from './pages/SearchForItemPage';
import PickItem from './pages/PickItem';
import SelectBin from './pages/SelectBin';
import PickBin from './pages/PickBin';
import BinPutAway from './pages/BinPutAway';

function App() {

  const [locations, setLocations] = useState([]);
  

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch('/api/locations//')
      const data = await response.json()
      setLocations(data)
    }

    fetchLocations()
  },[])
  return (
    <BrowserRouter>
   <div className='app-wrapper'>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/locations' element={<LocationsList locations={locations}/>}/>
      <Route path='/location-form' element={<LocationForm/>}/>
      <Route path='/location-search' element={<LocationSearch locations={locations}/>}/>
      <Route path='/location/item/search' element={<SearchForItemPage/>}/>
      <Route path='/location/item/pick-item' element={<PickItem/>}/>
      <Route path='/location/item/bin-putaway' element={<BinPutAway/>}/>
      <Route path='/location/item/pick-item/select-bin/:item' element={<SelectBin/>}/>
      <Route path='/location/item/pick-item/select-bin/:item/:bin' element={<PickBin/>}/>
    </Routes>
    
   </div>
   </BrowserRouter>
  );
}

export default App;
