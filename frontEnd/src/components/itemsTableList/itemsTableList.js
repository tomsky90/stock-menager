import React from 'react';

const itemTableList = ({data, binTitle}) => {
  return ( 
    <div className="items-list" key={data._id}>
          <div className="items-list__header">
            <p>Bin</p>
            <p>part</p>
            <p>qty</p>
          </div>
          <div className="items-list__item ">
            <p>{binTitle}</p>
            <p>{data.title}</p>
            <p>{data.qty}</p>
          </div>
        </div>
   );
}
 
export default itemTableList;