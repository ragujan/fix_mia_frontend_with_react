import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

function PreventLogin(props: { allowedRole: number }) {
  const { allowedRole } = props;
  const [cookies] = useCookies();
  const [isUserTypeExists, setIsUserTypeExists] = useState(false);
  const [isTokenExists, setIsTokenExists] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/linkpage";
  useEffect(() => {
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
      console.log("from is ",from)
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
    // console.log("user type exists ", isUserTypeExists);
    // console.log("token exists ", isTokenExists);
    if (!isUserTypeExists || !isTokenExists) {
      // console.log("action must happen")
    }
    // console.log("hey");
    // console.log(cookies["user_type"]);
  }, [cookies, isUserTypeExists, isTokenExists]);

  return cookies["user_type"] !== allowedRole ? (
    <Navigate to={"/login"} state={{ from: location }} replace />
  ) :  (
    // <Navigate to={"/linkpage"} state={{ from: location }} replace />
    <Navigate to={`${from}`} state={{ from: location }} replace />
    // <Outlet />
  );
}

export default PreventLogin;
