import React from "react";


const Item = (item) => {
  return (
    <div className="item">
      <p>{item?.qty}</p>
    </div>
  )
}

export default Item