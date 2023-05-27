import React from "react";

import './itemsTableList.css'
const itemTableList = ({ data, itemTitle }) => {
  

  return (
    <div className="items-list">
      <div className="items-list__header">
        <p>Bin:</p>
        <p>part:</p>
        <p>exp:</p>
        <p>qty:</p>
      </div>
      {data.map((loc) => (
        <div className="items-list__bin-item"  key={loc._id}>
        {
          loc.items.filter(item => item.title === itemTitle).map( (part) => (
                <div key={part._id} className="items-list__item ">
                <p className="cell">{loc.title}</p> <p className="cell">{part.title}</p> <p className="cell">{part.exp}</p> <p className="cell">{part.qty}</p>
              </div>
              )
          )
        } 
        </div>
      ))}
    </div>
  );
};

export default itemTableList;
