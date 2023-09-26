import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LinkPage = () => {
  const authContext = useAuth();
  const changeAuth = () => {
    authContext?.setAuth({
      userType: 0,
      refreshToken: "",
      token: "",
      role: 0,
      user: "marshall",
    });
  };
  return (
    <section>
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <Link to="/login">Login</Link>
      <br />
      <h2>Private</h2>
      <Link to="/home">Home</Link>
      <br />
      <Link to="/admin">Admin Page</Link>
      <br />
      <Link to="/userdashboard">user dashboard</Link>
      <br />
      <Link to="/testlogin">Test Login</Link>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>{authContext?.auth.refreshToken}</h1>
      <h1>{authContext?.auth.userType}</h1>
      <h1>{authContext?.auth.user}</h1>
      <h1>{authContext?.auth.role}</h1>
      <button
        className="bg-pink-400"
        onClick={() => {
          changeAuth();
        }}
      >
        Change Auth
      </button>
    </section>
  );
};

export default LinkPage;
