import { createContext } from "react";

export interface AuthData {
  user: string;
  role: number;
  token: string;
  refreshToken: string;
  userType:number
}

export interface ContextOption {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
}
const AuthContext = createContext<ContextOption>({
  auth: {
    user: "",
    role: 0,
    token:"",
    refreshToken:"",
    userType:0,
  },

  setAuth: () => {},
});

export default AuthContext;
