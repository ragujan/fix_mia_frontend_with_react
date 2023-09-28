import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useCookies } from "react-cookie";
import {  useEffect  } from "react";

 function RequireAuth(props: { allowedRole: number }) {
  const { allowedRole } = props;
  const location = useLocation();
  const [cookies] = useCookies();

  useEffect(() => {
    console.log("hey");
    console.log(cookies["user_type"]);
  }, [cookies]);

  return (
    cookies["user_type"] === allowedRole ? (
      <Outlet />
    ) : cookies["user_type"] === undefined ? (
      <Navigate to={"/login"} state={{ from: location }} replace />
    ) : (
      <Navigate to={"/unauthorized"} state={{ from: location }} replace />
    )
  );
}

export default RequireAuth;
