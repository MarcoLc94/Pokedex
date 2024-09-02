import axios from "axios";
import { useState } from "react";

const useFetch = () => {
  const [response, setResponse] = useState(null);

  const getData = (url) => {
    return axios.get(url)
      .then((response) => setResponse(response.data))
      .catch((error) => console.error(error));
  };

  return [response, getData];
};

export default useFetch;