import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useCookies } from "react-cookie";
import { makeRequests } from "../util/makeRequests";
import { GlobalContext } from "../context/GlobalContext";
import { useContext, useEffect, useState } from "react";

 function RequireAuth(props: { allowedRole: number }) {
  const { allowedRole } = props;
  const location = useLocation();
  const [cookies] = useCookies();
  const devProdOptions = useContext(GlobalContext);
  const apiUrl = devProdOptions.apiUrl;
  const validatetokenpath = "validate-token";
  const [isTokenValid, setIsTokenvalid] = useState(true);

  useEffect(() => {
    console.log("hey");
    console.log(cookies["user_type"]);
  }, [cookies]);

  // const verifyToken =async () => {
  //   if (
  //     !cookies["access-token"] ||
  //     cookies["access-token"] === "" ||
  //     !cookies["refresh-token"] ||
  //     cookies["refresh-token"] === ""
  //   ) {
  //     return false;
  //   }
  //   return true;
  // };

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
