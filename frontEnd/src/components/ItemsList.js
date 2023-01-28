import React from 'react';

const ItemsList = ({items}) => {

  const renderLocations = items.map( location => (<div className='items-list__item' key={location._id}>
    <div>
      <p>{location.title}</p>
    </div>
  </div>))

  return ( 
    <div className='items-list'>
       <header className='item-list__header'>
         <h3>Bin</h3>
         <h3>Quantity</h3>
      </header>
      {renderLocations && renderLocations}
    </div> 
  );
}
 
export default ItemsList;