import React, { useState } from "react";
//components
import SingleInputForm from "../components/singleInputForm/SingleInputForm";
import Message from "../components/message/Message";
//helpers
import { addNewBin } from "../fetchData/FetchData";

const CreateBin = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const location = { title: title };

    const data = await addNewBin(location);
    console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      setTitle("");
      setError(null);
      setMessage("Location " + location.title + " added");
    }
  };

  return (
    <div className="add-bin-page">
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
