export const getData = async (uri) => {
  const response = await fetch("/api/locations/" + uri);
    const json = await response.json();
    return json
}

export const editItem = async (uri, updatedItem) => {
  const response = await fetch('/api/locations/items/' + uri, {
    method: 'PATCH',
    body: JSON.stringify(updatedItem),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  return response
}

export const addNewBin = async ( location) => {
   const response = await fetch('/api/locations', {
      method: 'POST',
      body: JSON.stringify(location),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    return json
}