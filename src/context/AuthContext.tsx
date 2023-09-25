import { createContext } from "react";

interface AuthData {
  user: string;
  roles: number[];
}

interface ContextOption {
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
