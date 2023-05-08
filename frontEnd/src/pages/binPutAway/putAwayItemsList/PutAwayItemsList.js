import React from 'react';
//css
import './putAwayItemsList.css'

const PutAwayItemsList = ({list, setItemInputValue}) => {

  

  return ( 
    <div className="put-away__items-list">
      <div className="put-away__items-list__header">
        <p>Code:</p>
        <p>Description:</p>
        <p>Qty:</p>
      </div> 
      {list && list.map(item => (
            <div key={item._id} onClick={() => {setItemInputValue(item.title)}} className="put-away__items-list__bin-item">
              <p>{item.title}</p>
              <p>{item.description}</p>
              <p>{item.qty}</p>
            </div>
          )
      )}
    </div>
   );
}
 
export default PutAwayItemsList;