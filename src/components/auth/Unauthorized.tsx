import { useEffect } from "react";
// import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Unauthorized() {


  const { auth } = useAuth();
  useEffect(() => {
    console.log(auth);
  }, [auth]);
  return (
    <div>
      <h1>Unauthorized Page</h1>
      <Link to="/login">Login</Link>
      <br />
    </div>
  );
}

export default Unauthorized;
