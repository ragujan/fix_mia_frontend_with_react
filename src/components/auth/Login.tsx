import { useContext, useEffect, useState } from "react";
import logoImage from "./../../assets/resources/image_resources/logo.png";
import { validate } from "../../util/Validate";
import { makeRequests } from "../../util/makeRequests";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import { GlobalContext } from "../../context/GlobalContext";
// import useAuth from "../../hooks/useAuth";
import AuthContext from "../../context/AuthContext";
import { useCookies } from "react-cookie";
import useUserLoggedIn from "../../hooks/useUserLoggedIn";

function Login() {
  const title = "Login";
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { auth } = useContext(AuthContext);
  const [cookies, setCookies] = useCookies();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/linkpage";

  const [email, setEmail] = useState("rag@gmail.com");
  const [password, setPassword] = useState("ragbag###1111RRR");
  const [inputErrorState, setInputErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const userRegisterSuccessMessage = "Success:User is there";
  // const serverResponseMessageTypeStartsWith = "Non-Exception:";

  const devProdOptions = useContext(GlobalContext);
  const apiUrl = devProdOptions.apiUrl;
  const loginurl = "loginuser";
  const isUserLoggedIn = useUserLoggedIn();

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  useEffect(() => {
    // This code will run every time auth changes

    if (cookies["user_type"]) {
      console.log("is user logged in");
      console.log("is user logged in");
      console.log("is user logged in");
      console.log("is user logged in");
      // navigate(from, { replace: true });
      return;
    }
 
  }, [auth, cookies, from, isUserLoggedIn, navigate]);
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
      "json",
      "application/json"
    );

    if (typeof response === "object" && response !== null) {
      const json = JSON.parse(JSON.stringify(response));

      if (json[0].message === "login success") {
        console.log("going to home page man");
        const access_token = json[0]["access_token"];
        const refresh_token = json[0]["refresh_token"];
        const user = json[0]["email"];
        const user_type = json[0]["user-type"];
        console.log("refresh token is ", refresh_token);
        setInputErrorState(false);
        console.log("user type is", user_type);

        setCookies("access_token", access_token);
        setCookies("refresh_token", refresh_token);
        setCookies("user_type", user_type);
        setCookies("user", user);
        setErrorMessage("");
        console.log(auth);

        console.log("old saved token ", cookies["access_token"]);
        console.log("old saved rftoken ", cookies["refresh_token"]);
        console.log("new token ", access_token);
        console.log("new rf token ", refresh_token);
        navigate(from, { replace: true });
      } else {
        console.log(json[0].message);
        setInputErrorState(true);
        setErrorMessage(json[0].message);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-10 ">
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
              <GoogleLoginButton
                setInputErrorState={setInputErrorState}
                setErrorMessage={setErrorMessage}
              />
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
