import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

function Unauthorized() {
  const auth = useContext(AuthContext);
  useEffect(() => {
    console.log(auth);
  }, [auth]);
  return (
    <div>
      <h1>Unauthorized Page</h1>
    </div>
  );
}

export default Unauthorized;
