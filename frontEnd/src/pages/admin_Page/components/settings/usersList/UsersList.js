import React, { useEffect, useState } from "react";
//components
import Message from "../../../../../components/message/Message";
import Loader from "../../../../../components/loader/Loader";
//css
import "./usersList.css";
//base url
import { BASEURL } from "../../../../../config";

const UsersList = ({ user }) => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [users, setUsers] = useState(null);
  const [isWarningActive, setIsWarningActive] = useState(false);
  const [userToBeDeleted, setUserToBeDeleted] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const showWarning = (id) => {
    setUserToBeDeleted(id);
    setIsWarningActive(true);
  };
  const hideWarning = () => {
    setUserToBeDeleted("");
    setIsWarningActive(false);
  };

  const getUsers = async () => {
    const response = await fetch(BASEURL + "/api/user/get-users", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setUsers(json);
    }
  };

  useEffect(() => {
    //get users onload
    getUsers();
  }, []);

  const deleteUser = async () => {
    setIsLoading(true)
    const response = await fetch(
      BASEURL + "/api/user/delete/" + userToBeDeleted,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setIsLoading(false)
    }
    if (response.ok) {
      hideWarning();
      setMessage(`user ${json.email} succesfuly deleted` );
      setIsLoading(false)
      setTimeout(() => {
        setMessage("");
        getUsers();
      }, 2000);
    }
  };
  if(isLoading) {
    return <Loader/>
  }
  return (
    <div className="users-list">
      {message ? <Message status='succes' message={message}/> : null}
      <h3>Delete User</h3>
      <div
        className={
          isWarningActive ? "users-list__warning active" : "users-list__warning"
        }
      >
        <button
          onClick={hideWarning}
          className="users-list__warning__close-btn"
        >
          x
        </button>
        <h3>Do you want to continue?</h3>
        <button onClick={hideWarning} className="users-list__warning__no-btn">
          No
        </button>
        <button
          onClick={() => {
            deleteUser(user._id);
          }}
          className="users-list__warning__yes-btn"
        >
          Yes
        </button>
      </div>
      {error ? <Message status="error" message={error} /> : null}
      {users
        ? users.usersNoPassword.map((user) => (
            <div key={user._id} className="users-list__user-container">
              <p>{user.name}</p>
              <button
                onClick={() => {
                  showWarning(user._id);
                }}
              >
                Delete User
              </button>
            </div>
          ))
        : null}
    </div>
  );
};

export default UsersList;
