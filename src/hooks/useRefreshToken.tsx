import { useContext } from "react";

import { useCookies } from "react-cookie";
import { makeRequests } from "../util/makeRequests";
import { GlobalContext } from "../context/GlobalContext";

function useRefreshToken() {
  const [cookies, setCookies] = useCookies();
  const devProdOptions = useContext(GlobalContext);

  const refresh = async () => {
    //send this token to refersh
    if (
      cookies["refresh-tokne"] !== "" ||
      cookies["refresh-token"] !== undefined
    ) {
      // alert("calling refresh");
      const rfToken = cookies["refresh-token"];
      const formData = new FormData();
      const endpointPath = "refresh-token";
      formData.append("refresh-token", rfToken);
      const url = `${devProdOptions.apiUrl}${endpointPath}`;
      try {
        const response = await makeRequests("POST", url, formData, "json", "");
        if (typeof response === "object" && response !== null) {
          const json = JSON.parse(JSON.stringify(response));
          if (json[0]["status"] === "success") {
            const newAccessToken = json[0]["access_token"];
            console.log("new acess token created", newAccessToken);
            setCookies("access-token", newAccessToken);
            return newAccessToken;
          } else {
            console.log("token is not valid called from refresh token");
            console.log(response);
            
          }
        } else {
          console.log("user must sign in immediately");
        }
      } catch (error) {
        console.error(error)
      }
    }
  };
  return refresh;
}

export default useRefreshToken;
