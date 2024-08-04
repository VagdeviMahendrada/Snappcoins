import { useCallback } from "react"
import api from "../api/general-index";

const useFetch = () => {

  const fetchData = useCallback(async (config) => {


    try {
      const { data } = await api.request(config);
      return data;   
    }
    catch (error) {
      const msg = error.response?.data?.msg || error.message || "error";
      return msg;
    }
  },[]);

  return fetchData;
}

export default useFetch;