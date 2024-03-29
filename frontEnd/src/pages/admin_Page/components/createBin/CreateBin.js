import React, { useState } from "react";
//components
import SingleInputForm from "../../../../components/singleInputForm/SingleInputForm";
import Message from "../../../../components/message/Message";
import Loader from "../../../../components/loader/Loader";
//helpers
import { addNewBin } from "../../../../fetchData/FetchData";
//hooks
import { useAuthContext } from "../../../../hooks/useAuthContext";
//styles
import "./createBin.css";

const CreateBin = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false)

    if (title.length < 4) {
      setError("Please enter correct bin title.");
      setIsLoading(false);
    } else {
      setMessage("");
      setError("");

      const location = { title: title };

      const data = await addNewBin(location, user);
      if (data.error) {
        setError(data.error);
        setIsLoading(false);
      } else {
        setTitle("");
        setError(null);
        setMessage("Location " + location.title + " added");
        setIsLoading(false);
        setTimeout(() => {
          setMessage('')
        }, 2000)
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="create-bin-page">
      <h1>Create New Bin</h1>
      {message && <Message status="succes" message={message} />}
      {error && <Message status="error" message={error} />}
      <div className="create-bin-page__form-wrapper">
        <SingleInputForm
          handelSubmit={handleSubmit}
          setInputValue={setTitle}
          inputValue={title}
          type="text"
          title="Enter Bin Name:"
          btnText="Create"
        />
      </div>
    </div>
  );
};

export default CreateBin;
