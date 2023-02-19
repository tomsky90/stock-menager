import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PickBin = () => {
  const { item, bin } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [binTitle, setBinTitle] = useState();
  const [binId, seetBinId] = useState("");
  const [itemMessage, setItemMessage] = useState("");

  const handleInputChange = (e) => {
    if (e.target.value < 0) {
      return;
    }
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/locations/${bin}`);
        const json = await response.json();
        if (!response.ok) {
          setError(json.error);
        }
        if (response.ok) {
          setError(null);
          setBinTitle(json.title);
          seetBinId(json._id);
          const part = json.items.find((i) => i.title === item);
          setData(part);
        }
      } catch (err) {}
    };

    fetchData();
  }, []);

  const deletItem = async (item) => {
    const response = await fetch("/api/locations/items/delete/" + binId, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setItemMessage("Item Removed");
      setTimeout(() => {
        setItemMessage("");
        window.location.reload(true);
      }, 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (inputValue === "" || inputValue <= 0) {
      setError("Enter amount you want to pick");
      return;
    }
    if (inputValue > data.qty) {
      setError(`Total avalible: ${data.qty}`);
      return;
    }

    if (data.qty - inputValue === 0) {
      deletItem(data);
    }

    const item = { qty: data.qty - inputValue };

    const response = await fetch("/api/locations/items/edit/" + data._id, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setInputValue("");
      setError(null);
      setItemMessage("Item Succesfully Picked");
      setTimeout(() => {
        setItemMessage("");
        window.location.reload(true);
      }, 2000);
    }
  };

  return (
    <div className="pick-bin-page">
      <form onSubmit={handleSubmit} className="pick-bin-page__form">
        <div className="pick-bin-page__form-input-group">
          <label htmlFor="input">Quantity To Be Picked:</label>
          <input
            type="number"
            id="input"
            value={inputValue}
            onChange={handleInputChange}
          />
          {error && <div className="error-message">{error}</div>}
          {itemMessage && <div className="item-message">{itemMessage}</div>}
          <button type="submit">Submit</button>
        </div>
      </form>
      {data && (
        <div className="items-list" key={data._id}>
          <div className="items-list__header">
            <p>Bin</p>
            <p>part</p>
            <p>qty</p>
          </div>
          <div className="items-list__item ">
            <p>{binTitle}</p>
            <p>{data.title}</p>
            <p>{data.qty}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickBin;
