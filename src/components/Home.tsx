import { useCookies } from "react-cookie";
import useAuth from "../hooks/useAuth";

function Home() {
  const [cookies, setCookies] = useCookies();
  const authContext = useAuth();
  const removeCookies = () => {
    setCookies("access-token", "");
    setCookies("refresh-token", "");
    setCookies("user_type", "");
    setCookies("user", "")

  };
  return (
    <div>
      <h1>Bro this is home</h1>
      <h1>{cookies["access-token"]}</h1>

      <button
        onClick={() => {
          removeCookies();
        }}
      >
        Remove Cookies
      </button>
    </div>
  );
}

export default Home;
