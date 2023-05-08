import React, { useState, useEffect } from "react";
//components
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/message/Message";
//fetchers
import { getAllItems } from "../../../../fetchData/FetchData";

//context
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useItemsContext } from "../../../../hooks/useItemsContext";
//css
import "./adminHome.css";

const AdminHome = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { items, dispatch } = useItemsContext();
  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const getItems = async () => {
      const response = await getAllItems(user);
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        setIsLoading(false);
      }
      if (response.ok) {
        dispatch({ type: "SET_ITEMS", payload: json });
        setIsLoading(false);
      }
    };
    if (user) {
      getItems();
    }
  }, []);

  const filteredItems = items?.filter((item) => {
    return item.title.includes(searchInputValue);
  });

  return (
    <div className="admin-home">
      <header className="admin-header">
      <div className="admin-header__search-bar">
        <form className="admin-header__search-form">
          <label>
            Search for item:
            <input
              value={searchInputValue}
              onChange={(e) => {
                setSearchInputValue(e.target.value.toUpperCase());
              }}
              type="text"
              placeholder="Enter item code"
            />
            <button>Search</button>
          </label>
        </form>
      </div>
    </header>
      {error && <Message status="error" message={error} />}
      {isLoading ? <Loader /> : (
        <div className="admin-home__items-list">
          <div className="admin-home__items-list__header">
            <p>Code:</p>
              <p>Description:</p>
              <p>Total Qty:</p>
          </div>
          {items && filteredItems.map(item => (
            <div key={item._id} className="admin-home__items-list__item">
              <p>{item.title}</p>
              <p>{item.description}</p>
              <p>{item.qty}</p>
            </div>
          ))}

        </div>)}
    </div>
  );
};

export default AdminHome;
