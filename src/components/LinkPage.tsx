import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useCookies } from "react-cookie";
import { GlobalContext } from "../context/GlobalContext";
import { useContext, useState } from "react";
import { makeRequests } from "../util/makeRequests";
const LinkPage = () => {
  const authContext = useAuth();
  const [cookies] = useCookies();

  const devProdOptions = useContext(GlobalContext);
  const apiUrl = devProdOptions.apiUrl;
  const validatetokenpath = "validate-token";
  const [rf, setRf] = useState("");
  const [tok, setTok] = useState("");

  const changeAuth = () => {
    authContext?.setAuth({
      userType: 0,
      refreshToken: "",
      token: "",
      role: 0,
      user: "marshall",
    });
  };

  const checkTokenValidation = async () => {
    const formData = new FormData();
    formData.append("access-token", cookies["access-token"]);
    formData.append("refresh-token", cookies["refresh-token"]);
    const url = `${apiUrl}${validatetokenpath}`;
    const response = await makeRequests("POST", url, formData, "json", "");
    console.log(response);
    if (response !== undefined) {
      setRf(response[0]["refresh-token"]);
      setTok(response[0]["access-token"]);
    }
  };
  return (
    <section>
      <h1>Browser cookies are</h1>
      <h1>{cookies["access-token"]}</h1>

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
  
      <button
        onClick={() => {
          checkTokenValidation();
        }}
      >
        Check if the token is expired{" "}
      </button>
      <div className="w-[75%] bg-red-200">
        <p className="w-full p-4"></p>
        <textarea defaultValue={tok} className="bg-yellow-300" id="" cols={100} rows={4}>
        </textarea>
      </div>
      <br />
      <textarea  defaultValue={rf} name="" className="bg-blue-400" id="" cols={100} rows={4}>
      </textarea>

      <br />
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
