import React, { useState } from "react";
//components
import SingleInputForm from "../../components/singleInputForm/SingleInputForm";
import Message from "../../components/message/Message";
//helpers
import { addNewBin } from "../../fetchData/FetchData";
//hooks
import { useAuthContext } from "../../hooks/useAuthContext";
//styles
import './createBin.css'

const CreateBin = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length < 4) {
      setError("Please enter correct bin title.");
    } else {
      setMessage("");
      setError("");

      const location = { title: title };

      const data = await addNewBin(location, user);
      if (data.error) {
        setError(data.error);
      } else {
        setTitle("");
        setError(null);
        setMessage("Location " + location.title + " added");
      }
    }
  };

  return (
    <div className="add-bin-page">
      <h1>Create New Bin</h1>
      {message && <Message status="succes" message={message} />}
      {error && <Message status="error" message={error} />}
      <SingleInputForm
        handelSubmit={handleSubmit}
        setInputValue={setTitle}
        inputValue={title}
        type="text"
        title="Enter Bin Name:"
      />
    </div>
  );
};

export default CreateBin;
