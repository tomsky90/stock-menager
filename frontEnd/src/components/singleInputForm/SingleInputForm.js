import React from 'react';


const SingleInputForm = ({handelSubmit, setInputValue, inputValue, error, type, title}) => {
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
          {error && <div className="error-message">{error}</div>}
        </form>
   );
}
 
export default SingleInputForm;