import React from 'react';
//styles
import './singleInputForm.css'

const SingleInputForm = ({handelSubmit, setInputValue, inputValue, type, title, btnText}) => {
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
          <button type="submit">{btnText}</button>
        </form>
   );
}
 
export default SingleInputForm;