import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function RequireAuth(props: { allowedRole: number }) {
  const { allowedRole } = props;
  const { auth } = useAuth();
  const location = useLocation();

  return (
    // auth?.roles?.find(role=>allowedRoles?.includes(role))
    auth?.role === allowedRole ? (
      <Outlet />
    ) : auth?.role === 0 ? (
      <Navigate to={"/login"} state={{ from: location }} replace />
    ) : (
      <Navigate to={"/unauthorized"} state={{ from: location }} replace />
    )
  );
}

export default RequireAuth;
