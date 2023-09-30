import { useCookies } from "react-cookie";
import useRefreshToken from "../hooks/useRefreshToken";
import usePrivateRequestSender from "../hooks/usePrivateRequestSender";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import useUserLoggedIn from "../hooks/useUserLoggedIn";

import { useEffect } from "react";

function Home() {
  const [cookies, setCookies] = useCookies();
  const refresh = useRefreshToken();
  const devProdOptions = useContext(GlobalContext);
  const privateResponseSender = usePrivateRequestSender();
  const isLoggedIn = useUserLoggedIn();

  useEffect(() => {
    console.log("user logged in",isLoggedIn);
  }, [isLoggedIn]);

  const sendPrivateRequest = async () => {
    const endpointPath = "testpage2";
    const url = `${devProdOptions.apiUrl}${endpointPath}`;
    const formData = new FormData();
    formData.append("bro", "bro bro");
    try {
      const respone = await privateResponseSender(
        "POST",
        url,
        formData,
        "json",
        ""
      );
      console.log(respone);
    } catch (error) {
      console.log("you must login now ");
    }
  };
  const removeCookies = () => {
    setCookies("access_token", "");
    setCookies("refresh_token", "");
    setCookies("user_type", "");
    setCookies("user", "");
  };

  return (
    <div>
      <h1>Bro this is home</h1>
      <h1>{cookies["access_token"]}</h1>

      <button onClick={() => refresh()}>New token</button>
      <br />
      <button
        className="p-4 bg-yellow-300"
        onClick={() => sendPrivateRequest()}
      >
        to send private requests
      </button>
      <br />
      <Link to="/linkpage">Link Page</Link>

      <br />
      <Link to="/login">Login</Link>
      <br />
      <br />
      <button
        onClick={() => {
          removeCookies();
        }}
      >
        Remove Cookies
      </button>

      <h1>Is user logged {JSON.stringify(isLoggedIn)}</h1>
    </div>
  );
}

export default Home;
