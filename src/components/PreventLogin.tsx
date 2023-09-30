import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import useUserLoggedIn from "../hooks/useUserLoggedIn";

function PreventLogin(props: { allowedRole: number }) {
  const { allowedRole } = props;
  const [cookies] = useCookies();
  const [isUserTypeExists, setIsUserTypeExists] = useState(false);
  const [isTokenExists, setIsTokenExists] = useState(false);
  const isUserLoggedIn = useUserLoggedIn();
  // const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/linkpage";
  // useEffect(() => {
  //   const checkTokenExists = () => {
  //     if (cookies["access_token"] === undefined) {
  //       setIsTokenExists(false);
  //     } else {
  //       console.log("came here");
  //       setIsTokenExists(true);
  //       console.log("token exists ", isTokenExists);
  //     }
  //   };
  //   // const checkUserExists = () => {
  //   //   if (cookies["user_type"] !== undefined) {
  //   //     setIsUserTypeExists(true);
  //   //   }
  //   // };
  //   checkTokenExists();
  //   // checkUserExists();
  //   // console.log("user type exists ", isUserTypeExists);

  //   // console.log("hey");
  //   console.log(cookies["access_token"]);
  // }, [cookies, isTokenExists]);

  return !isUserLoggedIn ? (
    // <Navigate to={"/login"} state={{ from: location }} replace />
    <Outlet />
  ) : (
    <Navigate to={"/linkpage"} state={{ from: location }} replace />
  );
}

export default PreventLogin;
