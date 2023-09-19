import {  useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { makeRequests } from "../../util/makeRequests";
function GoogleLoginButton() {
    const [googleId, setGoogleId] = useState("");
    useEffect(() => {
        const setGoogleIdFunc = async () => {
          const id = await requestGoogleId();
          console.log(typeof id === "string");
          setGoogleId(id);
          console.log("google ", googleId);
          if (googleId !== "") {
            console.log("id is there man");
          } else {
            console.log("id is not there man");
          }
        };
    
        // Call the function directly when the component mounts
        setGoogleIdFunc();
      }, [googleId]);
      useEffect(() => {
        if (googleId !== "") {
          console.log("google client id is not empty ", googleId);
          const start = () => {
            gapi.client.init({
              clientId: googleId,
              scope: "",
            });
          };
          gapi.load("client:auth2", start);
        }
      }, [googleId]);
      const requestGoogleId: () => Promise<string> = async () => {
        const url = "http://localhost:8080/fix_mia_app_war_exploded/googleapi";
        const response = await makeRequests("GET", url, "", "text", "text/plain");
        if (typeof response === "string") {
          return response;
        } else {
          return "";
        }
      };
  return (
    <div id="signInButton">
    {googleId !== "" ? (
      <GoogleLogin
        clientId={googleId}
        buttonText="Login Via Google"
        onSuccess={() => {}}
        onFailure={() => {}}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
      />
    ) : (
      <></>
    )}
  </div>
  )
}

export default GoogleLoginButton
