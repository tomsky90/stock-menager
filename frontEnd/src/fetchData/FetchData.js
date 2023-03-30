//get all data
export const getData = async (uri) => {
  const response = await fetch("/api/locations/" + uri);
  const json = await response.json();
  return json;
};

//get single bin
export const getSingleBin = async (uri) => {
  const response = await fetch("/api/locations/" + uri);
  const json = await response;
  return json;
};

//get Item
export const getSingleItem = async (uri) => {
  const response = await fetch("/api/locations/find-items/" + uri);
  const json = await response;
  return json;
};

//add to item
export const addToItem = async (uri, item) => {
  const response = await fetch("/api/locations/items/add-to-item/" + uri, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response
};


//edit location item 
export const takeOffItem = async (uri, item) => {
  const response = await fetch(
    "/api/locations/items/take-off-item/" + uri,
    {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response
}
//edit location item 
export const editItem = async (uri, item) => {
  const response = await fetch(
    "/api/locations/items/edit/" + uri,
    {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response
} 

//add new bin
export const addNewBin = async (location) => {
  const response = await fetch("/api/locations", {
    method: "POST",
    body: JSON.stringify(location),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
};

//delete Item
export const deleteItem = async (item, uri) => {
  const response = await fetch("/api/locations/items/delete/" + uri, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
