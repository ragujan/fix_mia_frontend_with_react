import { useCookies } from "react-cookie";
const useClearCookies :()=>void = () => {
  const [, setCookies] = useCookies();
  const clear =  () => {
    setCookies("access_token", "");
    setCookies("refresh_token", "");
    setCookies("user_type", "");
    setCookies("user", "");
    return true;
  };
  return clear;
};

export default useClearCookies;
