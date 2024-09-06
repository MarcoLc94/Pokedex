import axios from "axios";
import { useState } from "react";

const useFetch = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const getData = (url) => {
    return axios.get(url)
      .then((response) => {
        setResponse(response.data);
        setError(null);  // Limpiar error en caso de éxito
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  };

  const getByName = (url, name) => {
    return axios.get(url)
      .then((response) => {
          setResponse(response.data);
          console.log(name)
      })
      .catch((error) => {
        console.error((error) => console.log(error));
        setError(error);
      });
  };

  return [response, getData, getByName, error];
};

export default useFetch;
