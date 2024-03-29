import { BASEURL } from "../config.js";
//get all data
export const getData = async (user) => {
  const response = await fetch(BASEURL + "/api/locations/", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const json = response;
  return json;
};

//get single bin
export const getSingleBin = async (item, uri, user) => {
  const response = await fetch(BASEURL + "/api/locations/" + uri +'/' + item, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const json = response;
  return json;
};

//get Item
export const getSingleItem = async (uri, user) => {
  const response = await fetch(BASEURL + "/api/locations/find-items/" + uri, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const json = response;
  return json;
};

//add to item qty
export const addToItem = async (uri, item, user) => {
  const response = await fetch(
    BASEURL + "/api/locations/items/add-to-item/" + uri,
    {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return response;
};

//put item away
export const putItemAway = async (uri, item, user) => {
  const response = await fetch(
    BASEURL + "/api/locations/items/put-item-away/" + uri,
    {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return response;
};

//push Item
export const pushItem = async (uri, item, user) => {
  const response = await fetch(
    BASEURL + "/api/locations/items/push-item/" + uri,
    {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return response;
};

//take off items qty
export const takeOffItem = async (uri, item, user) => {
  const response = await fetch(
    BASEURL + "/api/locations/items/take-off-item/" + uri,
    {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return response;
};
//edit location item
export const editItem = async (uri, item, user) => {
  const response = await fetch(BASEURL + "/api/locations/items/edit/" + uri, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response;
};

//add new bin
export const addNewBin = async (location, user) => {
  const response = await fetch(BASEURL + "/api/locations", {
    method: "POST",
    body: JSON.stringify(location),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  const json = await response.json();
  return json;
};

//delete Item
export const deleteItem = async (item, uri, user) => {
  const response = await fetch(BASEURL + "/api/locations/items/delete/" + uri, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response;
};

//create new item

export const createNewItem = async (item, user) => {
  const response = await fetch(BASEURL + "/api/items-list/create-item", {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response;
};

//get all items
export const getAllItems = async (user) => {
  const response = await fetch(BASEURL + "/api/items-list/get-items", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const json = response;
  return json;
};

//get Item
export const getItem = async (uri, user) => {
  const response = await fetch(BASEURL + "/api/items-list/get-item/" + uri, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const json = response;
  return json;
};

//update item 
export const addToItemListItem = async ( uri, item, user) => {
  const response = await fetch(BASEURL + "/api/items-list/add-item/" + uri, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response;
};

//update item 
export const takeOffItemListItem = async ( uri, item, user) => {
  const response = await fetch(BASEURL + "/api/items-list/take-off-item/" + uri, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response;
};
