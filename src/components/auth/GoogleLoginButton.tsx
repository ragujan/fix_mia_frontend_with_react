import { SetStateAction, useContext, useEffect, useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { gapi } from "gapi-script";
import { makeRequests } from "../../util/makeRequests";
import { GlobalContext } from "../../context/GlobalContext";

import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useUserLoggedIn from "../../hooks/useUserLoggedIn";

interface Props {
  setInputErrorState: React.Dispatch<SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<SetStateAction<string>>;
}

function GoogleLoginButton(props: Props) {
  const { setInputErrorState, setErrorMessage } = props;
  const [googleId, setGoogleId] = useState("");
  const devProdOptions = useContext(GlobalContext);
  const apiUrl = devProdOptions.apiUrl;
  const isUserLoggedIn = useUserLoggedIn();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/linkpage";
  const [, setCookies] = useCookies();

  useEffect(() => {
    const requestGoogleId: () => Promise<string> = async () => {
      const url = `${apiUrl}googleapi`;
      const response = await makeRequests("GET", url, "", "text", "text/plain");
      if (typeof response === "string") {
        setGoogleId(response);
        return response;
      } else {
        return "";
      }
    };
    if (!isUserLoggedIn) {
      requestGoogleId();
    }
    // Call the function directly when the component mounts
  }, [apiUrl, isUserLoggedIn]);

  useEffect(() => {
    if (!isUserLoggedIn && googleId !== "") {
      const start = () => {
        gapi.client.init({
          clientId: googleId,
          scope: "",
        });
      };
      gapi.load("client:auth2", start);
    }
  }, [googleId, isUserLoggedIn]);

  const onSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    let usergoogleId: string = "";
    if ("profileObj" in res) {
      const googleLoginResponseOnline = res as GoogleLoginResponse;
      // console.log("login success ", googleLoginResponseOnline.profileObj);
      console.log("success");
      console.log(googleLoginResponseOnline.tokenId);
      usergoogleId = googleLoginResponseOnline.tokenId;
    } else {
      const responseOffline = res as GoogleLoginResponseOffline;
      console.log("Offline response: ", responseOffline.code);
    }
    const url = `${apiUrl}googleoauthlogin`;

    const formData = new FormData();
    formData.append("credential", usergoogleId);
    const response = await makeRequests("POST", url, formData, "json", "");
    console.log("response is", response);

    if (typeof response === "object" && response !== null) {
      const json = JSON.parse(JSON.stringify(response));

      if (json[0].message === "login success") {
        console.log("going to home page man");
        const access_token = json[0]["access_token"];
        const refresh_token = json[0]["refresh_token"];
        const user = json[0]["email"];
        const user_type = json[0]["user-type"];
        setCookies("access_token", access_token);
        setCookies("refresh_token", refresh_token);
        setCookies("user_type", user_type);
        setCookies("user", user);

        setInputErrorState(false);
        setErrorMessage("");
        navigate(from, { replace: true });
        return;
      } else {
        console.log(json[0].message);
        setInputErrorState(true);
        setErrorMessage(json[0].message);
      }
    }
  };

  return (
    <div id="signInButton">
      {googleId !== "" ? (
        <GoogleLogin
          clientId={googleId}
          buttonText="Login Via Google"
          onSuccess={onSuccess}
          onFailure={() => {
            console.log("login failed");
          }}
          cookiePolicy="single_host_origin"
          isSignedIn={true}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default GoogleLoginButton;
