import { createContext } from "react";
type contexOption = {
  apiUrl:string
};
export const GlobalContext = createContext<contexOption>({
  apiUrl:""
});
