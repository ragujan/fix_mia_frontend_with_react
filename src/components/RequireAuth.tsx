import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

function RequireAuth(props: { allowedRole: number }) {
  const { allowedRole } = props;
  const location = useLocation();
  const [cookies] = useCookies();
  const [isUserTypeExists, setIsUserTypeExists] = useState(false);
  const [isTokenExists, setIsTokenExists] = useState(false);

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
  }, [cookies, isUserTypeExists, isTokenExists]);

  if (cookies["user_type"] === allowedRole) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  // return cookies["user_type"] === allowedRole ? (
  //   <Outlet />
  // ) : !isUserTypeExists || !isTokenExists ? (
  //   <Navigate to={"/login"} state={{ from: location }} replace />
  // ) : (
  //   <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  // );
}

export default RequireAuth;
