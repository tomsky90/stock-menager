import React, { useState } from "react";
import StepCounter from "../components/stepCounter/StepCounter";

const BinTransfer = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [data, setData] = useState();
  const [binTransferFrom, setBinTransferFrom] = useState(null);
  const [binTransferTo, setBinTransferTo] = useState(null);
  const [itemTransferred, setItemTransferred] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [itemCodeInput, setItemCodeInput] = useState("");
  const [itemQtyInput, setItemQtyInput] = useState("");
  const [qtyToBeTransferred, setQtyToBeTransferred] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState('');

  //get bin to transfer from
  const handelSubmit = async (e) => {
    e.preventDefault();

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
      setData(json);
      setBinTransferFrom(json);
      setActiveStep(2);
      setInputValue("");
    }
  };

  // find item you want to transfer
  const handleItemSubmit = async (e) => {
    e.preventDefault();

    if (itemCodeInput.length < 1 || itemCodeInput === "") {
      setError("Enter Valid Part Number!");
      return;
    }

    const response = await fetch("/api/locations/find-items/" + itemCodeInput);

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      const bin = json.find((i) => i.title === binTransferFrom.title);
      const part = bin.items.find((i) => i.title === itemCodeInput);
      setItemTransferred(part);
      setActiveStep(3);
    }
  };

  // choose how many items you want to transfer
  const selectQtyToBePicked = (e) => {
    e.preventDefault();

    if (itemQtyInput > itemTransferred.qty) {
      setError(
        `Max avalible ${itemTransferred.qty}. Please enter correct amount.`
      );
      return;
    }

    if (itemQtyInput === "") {
      setError(`Please enter amount you want to transfer.`);
      return;
    }
    setQtyToBeTransferred(itemQtyInput);
    setActiveStep(4);
  };

  // choose bin you want to transfer to
  const getTransferToBin = async (e) => {
    e.preventDefault();

    if (inputValue.length < 1) {
      setError("Enter valid bin number!");
      return;
    }

    if (inputValue === binTransferFrom.title) {
      setError("Can not complete operation, you need to choose different bin!");
      return;
    }

    const response = await fetch("/api/locations/" + inputValue);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setData(json);
      setBinTransferTo(json);
      setActiveStep(5);
    }
  };


  const deletItem = async (item) => {
    const response = await fetch('/api/locations/items/delete/' + binTransferFrom._id, 
      {
        method: 'PATCH',
        body: JSON.stringify(item),
        headers:{
        'Content-Type': 'application/json'
        }
      }
    )
  
    if(response.ok) {

      const item = {title: itemTransferred.title, qty: qtyToBeTransferred , exp: itemTransferred.exp};
      
          const response = await fetch('/api/locations/items/' + binTransferTo._id, {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers:{
              'Content-Type': 'application/json'
            }
          })
          const json = await response.json()
      
          if(!response.ok) {
            setError(json.error)
          }
          if(response.ok) {
            setError(null)
            setMessage('Item Succesfully Transfered!')
          }
      
    }
  
  }

  // handle transfer 
  const handleTransfer = async () => {
    setError(null)

    // calculate what's left in bin and update
    const qty = { qty: itemTransferred.qty - qtyToBeTransferred};
  
    // if qty to transfer = to total avalible qty delete item
    if(qty.qty === 0) {
      deletItem(itemTransferred)
    }
    
        const response = await fetch('/api/locations/items/edit/' + itemTransferred._id, {
          method: 'PATCH',
          body: JSON.stringify(qty),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
    
        if(!response.ok) {
          setError(json.error)
        }
        if(response.ok) {
      
          const item = {title: itemTransferred.title, qty: qtyToBeTransferred , exp: itemTransferred.exp};
      
          const response = await fetch('/api/locations/items/' + binTransferTo._id, {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers:{
              'Content-Type': 'application/json'
            }
          })
          const json = await response.json()
      
          if(!response.ok) {
            setError(json.error)
          }
          if(response.ok) {
            setError(null)
            setMessage('Item Succesfully Transfered!')
          }
        }
  }

  return (
    <div className="bin-transfer-page">
      <h1>Bin transfer</h1>
      {/* display progress bar */}
      <StepCounter steps={5} activeStep={activeStep} />

      {/* display bin form */}
      {activeStep === 1 ? (
        <form onSubmit={handelSubmit} className="item-search__form">
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
        </form>
      ) : null}

      {/* display item form */}
      {activeStep === 2 ? (
        <form
          onSubmit={handleItemSubmit}
          className="bin-transfare-page__item-form"
        >
          <div className="bin-transfer-page__item-form__input-wrapper">
            <label htmlFor="partInput">Item Code:</label>
            <input
              type="text"
              value={itemCodeInput}
              onChange={(e) => {
                setItemCodeInput(e.target.value.toUpperCase());
              }}
            />
            <div>
              <button type="submit">Submit</button>
            </div>
            
          </div>
        </form>
      ) : null}

      {/* display qty form */}
      {activeStep === 3 && (
        <form onSubmit={selectQtyToBePicked} className="pick-bin-page__form">
          <div className="pick-bin-page__form-input-group">
            <label htmlFor="input">Quantity To Be Picked:</label>
            <input
              type="number"
              id="input"
              value={itemQtyInput}
              onChange={(e) => {
                setItemQtyInput(e.target.value);
              }}
            />
            {error && <div className="error-message">{error}</div>}
            <button type="submit">Submit</button>
          </div>
        </form>
      )}

      {/* display bin form */}
      {activeStep === 4 ? (
        <form onSubmit={getTransferToBin} className="item-search__form">
          <label htmlFor="item-input">Select Bin to transfer to:</label>
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
        </form>
      ) : null}

      {/* display summary */}
      {activeStep === 5 && (
        <div className="transfer-summary">
          <div>
            <p>Bin transfer from: {binTransferFrom.title}</p>
            <p>Bin transfer to: {binTransferTo.title}</p>
            <p>Quantity to be transferred: {qtyToBeTransferred}</p>
          </div>
          {message && <div className='succes-message'>{message}</div>}
          <button className="transfer-summary button" onClick={handleTransfer}>Transfer</button>
        </div>
      )}

      {/* display tabel  */}
      {data && (
        <div className="items-list" key={data._id}>
          <div className="items-list__header">
            <p>Bin</p>
            <p>part</p>
            <p>qty</p>
          </div>
        {/* display items list */}
          {activeStep === 2 || (activeStep === 5 && data)
            ? data.items.map((part) => {
                return (
                  <div key={part._id} className="items-list__item ">
                    <p>{data.title}</p> <p>{part.title}</p> <p>{part.qty}</p>
                  </div>
                );
              })
            : null}

          {/* display selected item */}
          {activeStep === 3 || (activeStep === 4 && itemTransferred) ? (
            <div key={itemTransferred._id} className="items-list__item ">
              <p>{binTransferFrom.title}</p> <p>{itemTransferred.title}</p>{" "}
              <p>{itemTransferred.qty}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default BinTransfer;
