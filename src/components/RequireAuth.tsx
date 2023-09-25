import { Navigate, Outlet, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import useAuth from "../hooks/useAuth";
interface RequiredAuthProps {
    allowedRoles:number[]
}



function RequireAuth({allowedRoles}:RequiredAuthProps) {
  const context = useContext(AuthContext);
  const { auth } = useAuth();
  const location = useLocation();

  alert(context.auth)

 return (
    auth?.roles?.find(role=>allowedRoles?.includes(role))
    ?<Outlet/>
    :auth?.user ? <Navigate to={"/unauthorized"} state={{from:location}} replace/>
    :<Navigate to={"/login"} state={{from:location}} replace/>
 )
}

export default RequireAuth;
