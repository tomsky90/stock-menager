import React, { useState } from "react";
//context
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useSettingsContext } from "../../../../hooks/useSettingsContext";
//components
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/message/Message";
import UsersList from "./usersList/UsersList";
//css
import "./settings.css";
//base url
import { BASEURL } from "../../../../config";

const Settings = () => {
  const [userNameInput, setUserNameInput] = useState("");
  const [userPasswordInput, setUserPasswordInput] = useState("");
  const [lowStockInput, setLowStockInput] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [isOffice, setIsOffice] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();
  const { settings } = useSettingsContext();

  const handleChange = (e) => {
    setIsOffice(!isOffice);
  };

  const createUser = async () => {
    setError(false);
    setIsLoading(true);
    if (userNameInput.length < 5 || userPasswordInput.length < 5) {
      setError("Enter correct user name and password");
      setIsLoading(false);
    }
    const newUser = {
      email: userNameInput,
      password: userPasswordInput,
      office: isOffice,
    };
    const response = await fetch(BASEURL + "/api/user/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ newUser }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      setMessage(`User ${json.email} added succesfuly`);
      setTimeout(() => {
        setMessage("");
        setUserNameInput("");
        setUserPasswordInput("");
        setIsOffice(false);
      }, 3000);
    }
  };

  const setLowStock = async () => {
    const item = {
      title: "lowStock",
      qty: lowStockInput,
    };
    setIsLoading(true);
    const response = await fetch(
      BASEURL + "/api/settings/edit/" + settings?.lowStock?.id,
      {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json);
    }
    if (response.ok) {
      setIsLoading(false);
      setMessage("Settings updated successfully");
      setTimeout(() => {
        setMessage('')
        setLowStockInput('')
      }, 2000)
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="settings-page">
      <div className="settings-page__low-stock">
        {message ? <Message status="succes" message={message} /> : null}
        {error ? <Message status="error" message={error} /> : null}
        <label>
          Set low stock level:
          <input
            type="number"
            value={lowStockInput}
            onChange={(e) => {
              setLowStockInput(e.target.value);
            }}
          />
        </label>
        <button onClick={setLowStock}>Set</button>
      </div>
      <div className="settings-page__user-settings">
        <div className="settings-page__user-settings-create-user">
          <h3>Add new user</h3>
          <label>
            User name
            <input
              type="text"
              value={userNameInput}
              onChange={(e) => {
                setUserNameInput(e.target.value);
              }}
              placeholder="enter user name"
            />
          </label>
          <label>
            User password
            <input
              type="text"
              value={userPasswordInput}
              onChange={(e) => {
                setUserPasswordInput(e.target.value);
              }}
              placeholder="enter password"
            />
          </label>
          <div className="settings-page__user-settings-create-user__role-select">
            <h3>Select users role:</h3>
            <label>
              Office:
              <input
                type="checkbox"
                checked={isOffice}
                onChange={handleChange}
              />
            </label>
          </div>
          <button disabled={isLoading} onClick={createUser}>
            Create User
          </button>
        </div>
        <UsersList user={user} />
      </div>
    </div>
  );
};

export default Settings;
