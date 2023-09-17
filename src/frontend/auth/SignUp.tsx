// import React from 'react'
import { useEffect, useState } from "react";
import logoImage from "./../../assets/resources/image_resources/logo.png";
import { validate } from "../../util/Validate";
import { makeRequests } from "../../util/makeRequests";
import { Link } from "react-router-dom";
function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputErrorState, setInputErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userRegisterSuccessMessage = "Non-Exception:User added successfully";
  const serverResponseMessageTypeStartsWith = "Non-Exception:";
  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const showConfirmPassword = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const doSignUp = async () => {
    // console.log("Email:", email);
    // console.log("Username:", username);
    // console.log("Password:", password);
    // console.log("Confirm Password:", confirmPassword);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    if (!validate(username, "username")) {
      setErrorMessage("Invalid username only numbers and texts are allowed");
      setInputErrorState(true);
      return;
    }
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
    if (password != confirmPassword) {
      setErrorMessage("Passwords don't match");
      setInputErrorState(true);
      return;
    }
    setInputErrorState(false);
    const myData = JSON.stringify({
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
    const url = "http://localhost:8080/fix_mia_app_war_exploded/signupuser";
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
        console.log(userRegisterSuccessMessage.toLocaleLowerCase());
      } else {
        console.log(response);
        // const res = response as string;
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

  useEffect(() => {
    console.log("Password visibility status ", passwordVisible);
  }, [passwordVisible]);
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-10 bg-grey-lighter">
        <div className="container flex flex-col items-center justify-center flex-1 max-w-md px-2 mx-auto">
          <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
            <div className="flex justify-center w-full ">
              <img className="w-10 h-10" src={logoImage} alt="" />
            </div>
            <h1 className="mb-4 text-3xl font-semibold text-center">Sign up</h1>
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
              id="username"
              type="text"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

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
                  {passwordVisible ? "hide" : "show"}
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

            {/* confirm password input */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 right-0 flex items-center px-2">
                <label
                  className="px-2 py-1 font-mono text-sm text-gray-600 bg-gray-300 rounded cursor-pointer hover:bg-gray-400 js-password-label-2"
                  onClick={() => {
                    showConfirmPassword();
                  }}
                >
                  {confirmPasswordVisible ? "hide" : "show"}
                </label>
              </div>
              <input
                className="block w-full p-3 mb-4 border rounded border-grey-light"
                name="password"
                id="confirm-password"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <button
              className="w-full py-3 my-1 text-center text-white rounded bg-maintheme hover:bg-green-dark focus:outline-none"
              onClick={() => {
                doSignUp();
              }}
            >
              Create Account
            </button>
            <div className="mt-4 text-sm text-center text-grey-dark">
              <Link
                className="text-blue-700 underline cursor-pointer"
                to={"/login"}
              >
                Login
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

export default SignUp;
