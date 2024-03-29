// import Login from './frontend/auth/Login'

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import { Routes, Route } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";
import getApiUrlPath from "./util/getApiUrlPath";
import { useState } from "react";
import Layout from "./components/Layout";
import RequireAuth from "./components/auth/RequireAuth";
import Home from "./components/Home";
import Unauthorized from "./components/auth/Unauthorized";

import LinkPage from "./components/LinkPage";
import UserDashboard from "./components/UserDashboard";
import TestLogin from "./components/TestLogin";
// import { useCookies } from "react-cookie";
import PreventLogin from "./components/auth/PreventLogin";
import SellerRegister from "./components/seller/SellerRegister";
import HomeTest from "./components/HomeTest";

interface ROLESTYPE {
  User: number;
  Moderator: number;
  Admin: number;
}
const ROLES: ROLESTYPE = {
  User: 10001,
  Moderator: 1984,
  Admin: 20001,
};
function App() {
  const [apiUrl] = useState(getApiUrlPath());
  // const [cookies, setCookies] = useCookies();
  // alert(ROLES.User);
  return (
    <>
      <GlobalContext.Provider value={{ apiUrl }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/home" element={<Home />} />
            <Route path="/hometest" element={<HomeTest />} />

            <Route path="/testlogin" element={<TestLogin />} />

            {/* {cookies["access_token"] === undefined ? ( */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* ) : (
              <Route path="/home" element={<Home />} />
            )} */}
          </Route>

          <Route element={<PreventLogin />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<RequireAuth allowedRole={ROLES.User} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/linkpage" element={<LinkPage />} />
            <Route path="/testlogin" element={<TestLogin />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/seller">
              <Route path="/seller/register-seller" element={<SellerRegister />} />
            </Route>
          </Route>
        </Routes>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
