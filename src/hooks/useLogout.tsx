import { useCookies } from "react-cookie";
import { makeRequests } from "../util/makeRequests";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";
const useLogout = () => {
  const [cookies] = useCookies();
  const devProdOptions = useContext(GlobalContext);
  const apiUrl = devProdOptions.apiUrl;

  const requestLogOut = async () => {
    const formData = new FormData();
    formData.append("access-token", cookies["access_token"]);
    formData.append("refresh-token", cookies["refresh_token"]);
    const logoutUrl = "logout";
    const url = `${apiUrl}${logoutUrl}`;
    const response = await makeRequests("POST", url, formData, "json", "");
    console.log(response);

  };
  return requestLogOut;
};

export default useLogout;
