import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const useUserLoggedIn:() => () => boolean = () => {
  const [isLoggedIn, setIsloggedIn] = useState(true);
  const [cookies] = useCookies();
  const checkUserIsLoggedId:()=>boolean = () => {
    const user_type = cookies["user_type"];
    const access_token = cookies["access_token"];
    const refresh_token = cookies["refresh_token"];

    if (!user_type || !access_token || !refresh_token) {
      setIsloggedIn(false);
      return false;
    } else {
      setIsloggedIn(true);
      return true;
    }
  };
  useEffect(() => {
    const user_type = cookies["user_type"];
    const access_token = cookies["access_token"];
    const refresh_token = cookies["refresh_token"];

    if (!user_type || !access_token || !refresh_token) {
      setIsloggedIn(false);
    } else {
      setIsloggedIn(true);
    }
  }, [isLoggedIn, cookies]);

  return checkUserIsLoggedId;
};

export default useUserLoggedIn;
