import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//featchers
import { getSingleItem } from "../../fetchData/FetchData";
const SelectBin = () => {
  const navigate = useNavigate();
  let { item } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [itemQty, setItemQty] = useState("");

  const selectInput = (bin) => {
    setInputValue(bin);
  };

  //calculate total qty on stock
  const addQty = (locations) => {
    let count = 0;
    for (const location of locations) {
      for (const part of location.items) {
        if (part.title === item) {
          count += part.qty;
        }
      }
    }
    setItemQty(count);
  };

  useEffect(() => {
    //find items by item code
    const getData = async () => {
      const response = await getSingleItem(item);
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setError(null);
        setData(json);
        addQty(json);
      }
    };

    getData();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();

    setData([]);
    setItemQty("");

    if (inputValue.length < 1) {
      setError("Enter valid bin number!");
      return;
    }

    const response = await fetch("/api/locations/" + inputValue);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      navigate(`/location/item/pick-item/select-bin/${item}/${inputValue}`, {
        replace: true,
      });
    }
  };

  return (
    <div className="select-bin-page">
      {/* <form onSubmit={handelSubmit} className="item-search__form">
        <label htmlFor="item-input">Select Bin:</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value.toUpperCase());
          }}
          id="item-input"
        />
        <button type="submit">Search</button>
        {error && <div className="error-message">{error}</div>}
      </form> */}
      {itemQty && (
        <div className="item-search__total-qty">Total on Stock: {itemQty}</div>
      )}
      
    </div>
  );
};

export default SelectBin;
