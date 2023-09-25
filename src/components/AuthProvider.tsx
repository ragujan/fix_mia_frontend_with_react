import { ReactNode, useState } from "react";
import AuthContext from "../context/AuthContext";

interface Props {
  children?: ReactNode;
}
interface AuthData {
  user: string;
  roles: number[];
}

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<AuthData>({
    user: "nothing",
    roles: [],
  });

  return (
    // <AuthContext.Provider value={{ auth,user, setAuth }}>
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
