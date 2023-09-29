import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function TestLogin() {
  const { auth} = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/linkpage";

  // useEffect(() => {
  //   // This code will run every time auth changes
  //   console.log("Auth updated:", auth);
  //   if (auth.role !== 0) {
  //     navigate(from, { replace: true });
  //   }
  // }, [auth, from, navigate]);
  return (
    <div>
      <h1>Test login</h1>
    </div>
  );
}

export default TestLogin;
