import React, { useState } from "react";
//components
import Spiner from "../../../../components/loader/Loader";
import Message from "../../../../components/message/Message";
//fetch data
import { createNewItem } from "../../../../fetchData/FetchData";
//hooks
import { useAuthContext } from "../../../../hooks/useAuthContext";
//css
import "./createNewItem.css";
const CreateNewItem = () => {
  const [itemCodeInput, setItemCodeInput] = useState("");
  const [itemDescriptionInput, setItemDescriptionInput] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    if (itemCodeInput.length < 4) {
      setError("Please enter correct bin title.");
      setIsLoading(false);
    } else {
      setMessage("");
      setError("");

      const item = { title: itemCodeInput, description: itemDescriptionInput };

      const data = await createNewItem(item, user);
      if (data.error) {
        setError(data.error);
        setIsLoading(false);
      } else {
        setError(null);
        setMessage("Location " + item.title + " added");
        setIsLoading(false);
        setTimeout(() => {
          setItemCodeInput("");
          setItemDescriptionInput("");
          setMessage("");
        }, 2000);
      }
    }
  };

  return (
    <div className="create-new-item-page">
      <h1>Add new item</h1>
      <form className="create-new-item-page__form" onSubmit={handleSubmit}>
        <div className="create-new-item-page__form__input-wrapper">
          <label>Item code:</label>
          <input
            type="text"
            value={itemCodeInput}
            onChange={(e) => {
              setItemCodeInput(e.target.value.toUpperCase());
            }}
          />
        </div>
        <div className="create-new-item-page__form__input-wrapper">
          <label>Item description:</label>
          <input
            type="text"
            value={itemDescriptionInput}
            onChange={(e) => {
              setItemDescriptionInput(e.target.value.toUpperCase());
            }}
          />
        </div>
        <button type="submit">Create</button>
        {message && <Message status="succes" message={message} />}
        {error && <Message status="error" message={error} />}
      </form>
      {isLoading && <Spiner />}
    </div>
  );
};

export default CreateNewItem;
