import { ReactNode, useState } from "react";
import AuthContext, { AuthData } from "../context/AuthContext";

interface Props {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<AuthData>({
    user: "",
    role: 0,
    token:"",
    refreshToken:"",
    userType:0,

  });

  return (
    // <AuthContext.Provider value={{ auth,user, setAuth }}>
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
