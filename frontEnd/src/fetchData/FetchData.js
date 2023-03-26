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

//update Item
export const editItem = async (uri, item) => {
  const response = await fetch("/api/locations/items/" + uri, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response
  return json
};

//edit location item 
export const editLocation = async (uri, item) => {
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
  const json = await response
  return json
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
