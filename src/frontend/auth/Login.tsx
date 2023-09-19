import {  useContext, useState } from "react";
import logoImage from "./../../assets/resources/image_resources/logo.png";
import { validate } from "../../util/Validate";
import { makeRequests } from "../../util/makeRequests";
import { Link } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import { GlobalContext } from "../../util/GlobalContext";

function Login() {
  const title = "Login";
  const [passwordVisible, setPasswordVisible] = useState(false);
 
  // const google_client_id = process.env.GOOGLE_CLIENT_ID;
  const [email, setEmail] = useState("rag@gmail3.com");
  const [password, setPassword] = useState("123Rag###rag");
  const [inputErrorState, setInputErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userRegisterSuccessMessage = "Success:User is there";
  const serverResponseMessageTypeStartsWith = "Non-Exception:";

  const devProdOptions = useContext(GlobalContext);
  const apiUrl = devProdOptions.apiUrl;
  const loginurl = "loginuser"

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };


  const doLogin = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    if (!validate(email, "email")) {
      setErrorMessage("Invalid email");
      setInputErrorState(true);
      return;
    }
    if (!validate(password, "password")) {
      setErrorMessage(
        "Password length minimum 8, atleast a number, special character, upper case, lower case"
      );
      setInputErrorState(true);
      return;
    }

    setInputErrorState(false);
    const myData = JSON.stringify({
      email: email,
      password: password,
    });
    // const url = "/api/loginuser";
    const url = `${apiUrl}${loginurl}`;
    const response = await makeRequests(
      "POST",
      url,
      myData,
      "text",
      "application/json"
    );
    if (typeof response === "string") {
      if (
        response.toLocaleLowerCase() ===
        userRegisterSuccessMessage.toLocaleLowerCase()
      ) {
        setInputErrorState(false);
        console.log("Success");
        console.log(userRegisterSuccessMessage.toLocaleLowerCase());
      } else {
        console.log(response);
        console.log("bad");
        if (response.includes(serverResponseMessageTypeStartsWith)) {
          const errMsg = response.replaceAll(
            serverResponseMessageTypeStartsWith,
            ""
          );
          setInputErrorState(true);
          setErrorMessage(errMsg);
        }
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-10 bg-grey-lighter">
        <div className="container flex flex-col items-center justify-center flex-1 max-w-md px-2 mx-auto">
          <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
            <div className="flex justify-center w-full ">
              <img className="w-10 h-10" src={logoImage} alt="" />
            </div>
            <h1 className="mb-4 text-3xl font-semibold text-center">{title}</h1>
            {/* error message div */}
            {inputErrorState ? (
              <div
                id="errorDivContainer"
                className="p-1 mb-3 border-2 border-red-400 "
              >
                <div className="flex items-center justify-center text-3xl text-center ">
                  <span id="errorBox" className="p-3 text-sm text-red-500 ">
                    {errorMessage}
                  </span>
                </div>
              </div>
            ) : (
              <></>
            )}

            <input
              id="email"
              type="text"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            {/* password input */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 right-0 flex items-center px-2">
                <label
                  className="px-2 py-1 font-mono text-sm text-gray-600 bg-gray-300 rounded cursor-pointer hover:bg-gray-400 js-password-label-1"
                  onClick={() => {
                    showPassword();
                  }}
                >
                  show
                </label>
              </div>
              <input
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                name="password"
                id="password"
                type={passwordVisible === true ? "text" : "password"}
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button
              className="w-full py-3 my-1 text-center text-white rounded bg-maintheme hover:bg-green-dark focus:outline-none"
              onClick={() => {
                doLogin();
              }}
            >
              Login
            </button>
            <div className="flex justify-center w-full pt-3 pb-2 my-1 ">
                  <GoogleLoginButton/>
            </div>
            {/* <div className="flex justify-center w-full pt-3 pb-2 my-1 ">

                    <div id="g_id_onload"
                        data-client_id="337084451495-b1tda8u3401dmtqcpcfsrlgprnrs0op8.apps.googleusercontent.com"
                        data-context="signup" data-ux_mode="redirect"
                        data-login_uri="http://localhost:8080/fix_mia_app_war_exploded/signupgooglehome"
                        data-callback="signup_google" data-nonce="" data-itp_support="true">
                    </div>

                    <div className="g_id_signin" data-type="standard" data-shape="rectangular" data-theme="outline"
                        data-text="signup_with" data-size="large" data-locale="en-US" data-logo_alignment="left">
                    </div>
                </div> */}
            <div className="mt-4 text-sm text-center text-grey-dark">
              <Link
                className="text-blue-700 underline cursor-pointer"
                to={"/signup"}
              >
                SignUp
              </Link>
            </div>
            <div className="mt-4 text-sm text-center text-grey-dark">
              By signing up, you agree to the Terms of Service and Privacy
              Policy
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
