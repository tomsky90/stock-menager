export const getData = async (uri) => {
  const response = await fetch("/api/locations/" + uri);
    const json = await response.json();
    return json
}