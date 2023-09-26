import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function Unauthorized() {
  const { auth} = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/linkpage";

  useEffect(() => {
    // This code will run every time auth changes
    console.log("Auth updated:", auth);
    if (auth.role !== 0) {
      navigate(from, { replace: true });
    }
  }, [auth]);
  return (
    <div>
      <h1>Unauthorized Page</h1>
    </div>
  );
}

export default Unauthorized;
