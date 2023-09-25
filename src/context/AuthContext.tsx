import { createContext } from "react";

export interface AuthData {
  user: string;
  roles: number[];
}

export interface ContextOption {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
}
const AuthContext = createContext<ContextOption>({
  auth: {
    user: "",
    roles: [],
  },

  setAuth: () => {},
});

export default AuthContext;
