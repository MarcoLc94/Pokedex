import axios from "axios";
import { useState } from "react";

const useFetch = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const getData = async (url) => {
    try {
    const response = await axios.get(url)
        setResponse(response.data);
        setError(null);
        console.log(response.data)
        return response.data  // Limpiar error en caso de éxito
      }
      catch(error) {
        console.error(error);
        setError(error);
      };
  };

const getByName = async (url, name) => {
  try {
    const result = await axios.get(url);
    setResponse(result.data);
    console.log(result.data)
    return result.data; // Retornar explícitamente la respuesta
  } catch (error) {
    console.error(error);
    console.log(name)
    setError(error);
  }
};

  return [response, getData, getByName, error];
};

export default useFetch;
