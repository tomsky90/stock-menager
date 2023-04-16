
//get all data
export const getData = async ( user) => {
  const response = await fetch("https://stock-menager-back-end.onrender.com/api/locations/", {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  });
  const json = response;
  return json;
};

//get single bin
export const getSingleBin = async (uri, user) => {
  const response = await fetch("https://stock-menager-back-end.onrender.com/api/locations/" + uri, {headers: {
    'Authorization': `Bearer ${user.token}`
  }});
  const json = response;
  return json;
};

//get Item
export const getSingleItem = async (uri, user) => {
  const response = await fetch("https://stock-menager-back-end.onrender.com/api/locations/find-items/" + uri, {headers: {
    'Authorization': `Bearer ${user.token}`
  }});
  const json = response;
  return json;
};

//add to item qty
export const addToItem = async (uri, item, user) => {
  const response = await fetch("https://stock-menager-back-end.onrender.com/api/locations/items/add-to-item/" + uri, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${user.token}`
    },
  });
  return response
};

//put item away
export const putItemAway = async (uri, item, user) => {
  const response = await fetch("https://stock-menager-back-end.onrender.com/api/locations/items/put-item-away/"+ uri, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${user.token}`
    },
  });
  return response
}

//push Item
export const pushItem = async (uri, item, user) => {
  const response = await fetch('https://stock-menager-back-end.onrender.com/api/locations/items/push-item/'+ uri, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${user.token}`
    },
  });
  return response
}


//take off items qty 
export const takeOffItem = async (uri, item, user) => {
  const response = await fetch(
    "https://stock-menager-back-end.onrender.com/api/locations/items/take-off-item/" + uri,
    {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
    }
  );
  return response
}
//edit location item 
export const editItem = async (uri, item, user) => {
  const response = await fetch(
    "https://stock-menager-back-end.onrender.com/api/locations/items/edit/" + uri,
    {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
    }
  );
  return response
} 

//add new bin
export const addNewBin = async (location, user) => {
  const response = await fetch("https://stock-menager-back-end.onrender.com/api/locations", {
    method: "POST",
    body: JSON.stringify(location),
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${user.token}`
    },
  });
  const json = await response.json();
  return json;
};

//delete Item
export const deleteItem = async (item, uri, user) => {
  const response = await fetch("https://stock-menager-back-end.onrender.com/api/locations/items/delete/" + uri, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${user.token}`
    },
  });
  return response;
};
