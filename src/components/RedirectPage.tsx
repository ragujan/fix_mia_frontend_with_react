import {  useNavigate } from "react-router-dom";

import { useEffect } from "react";
const RedirectPage = () => {
  const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/linkpage";

  useEffect(() => {
    console.log("this is redirect page")
    navigate(-1);
  });

  return(
    <></>
  )
};

export default RedirectPage;
