import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import useUserLoggedIn from "../hooks/useUserLoggedIn";

function PreventLogin(props: { allowedRole: number }) {
  const { allowedRole } = props;
  const location = useLocation();
  const [cookies] = useCookies();
  const [isUserTypeExists, setIsUserTypeExists] = useState(false);
  const [isTokenExists, setIsTokenExists] = useState(false);
  const isUserLoggedIn = useUserLoggedIn();

  useEffect(() => {
    console.log("prevent login is built")
    const checkTokenExists = () => {
      if (
        cookies["access_token"] !== undefined &&
        cookies["access_token"] !== null &&
        cookies["access_token"] !== ""
      ) {
        setIsTokenExists(true);
      } else {
        setIsTokenExists(false);
      }
    };
    const checkUserExists = () => {
      if (
        cookies["user_type"] !== undefined &&
        cookies["user_type"] !== null &&
        cookies["user_type"] !== ""
      ) {
        setIsUserTypeExists(true);
      }
    };
    checkTokenExists();
    checkUserExists();

    if (!isUserTypeExists || !isTokenExists) {
      console.log("action must happen");
    }
    console.log('is user logged in hook ',isUserLoggedIn())
  }, [cookies, isUserTypeExists, isTokenExists,isUserLoggedIn]);


  return !isTokenExists ? (
    <Outlet />
  ) :  (
    <Navigate to={"/home"} state={{ from: location }} replace />
  );
}

export default PreventLogin;
