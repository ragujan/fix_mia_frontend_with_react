import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const useApiUrl = () => {
  const devProdOptions = useContext(GlobalContext);
  const apiUrl = devProdOptions.apiUrl;
  return apiUrl;
};

export default useApiUrl;
