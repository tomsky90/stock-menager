import React from "react";
//components
import Message from "../message/Message";
//styles
import './itemForm.css'

const ItemForm = ({
  formActive,
  itemCodeInput,
  itemCodeInputOnChange,
  itemExpiry,
  itemExpiryOnChange,
  itemQtyOnChange,
  itemQtyInput,
  handleSubmit,
  error,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={formActive ? "item-form active" : "item-form"}
    >
      <div className="item-form__input-wrapper">
        <label htmlFor="item-code">Item Code:</label>
        <input
          type="text"
          value={itemCodeInput}
          id="item-code"
          onChange={(e) => {
            itemCodeInputOnChange(e);
          }}
        />
      </div>
      <div className="item-form__input-wrapper">
        <label htmlFor="item-exp">Expiry Date:</label>
        <input
          type="date"
          value={itemExpiry}
          id="item-exp"
          onChange={(e) => {
            itemExpiryOnChange(e);
          }}
        />
      </div>
      <div className="item-form__input-wrapper">
        <label htmlFor="item-qty">Item Qty:</label>
        <input type="number" value={itemQtyInput} onChange={itemQtyOnChange} />
      </div>
      {error && <Message status="error" message={error} />}

      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
