import React from 'react';

const SingleInputForm = ({handelSubmit, setInputValue, inputValue, type, title}) => {
  return ( 
    <form onSubmit={handelSubmit} className="single-search__form">
          <label htmlFor="item-input">{title}</label>
          <input
            type={type}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value.toUpperCase());
            }}
            id="item-input"
          />
          <button type="submit">Search</button>
        </form>
   );
}
 
export default SingleInputForm;