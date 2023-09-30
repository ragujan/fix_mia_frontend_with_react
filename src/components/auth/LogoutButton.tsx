import { useContext } from "react";
import { makeRequests } from "../../util/makeRequests";
import { GlobalContext } from "../../context/GlobalContext";
import { useCookies } from "react-cookie";

const LogoutButton = () => {
  const [cookies, setCookies] = useCookies();
  const devProdOptions = useContext(GlobalContext);
  const apiUrl = devProdOptions.apiUrl;

  const removeCookies = () => {
    setCookies("access_token", "");
    setCookies("refresh_token", "");
    setCookies("user_type", "");
    setCookies("user", "");
  };
  const requestLogOut = async () => {
    const formData = new FormData();
    formData.append("access-token", cookies["access_token"]);
    formData.append("refresh-token", cookies["refresh_token"]);
    const logoutUrl = "logout";
    const url = `${apiUrl}${logoutUrl}`;
    const response = await makeRequests("POST", url, formData, "json", "");

    console.log(response);
  };
  const logout = async () => {
    await requestLogOut();
    removeCookies();
  };

  return <div onClick={() => logout()}>Logout For Real</div>;
};

export default LogoutButton;
