// import Login from './frontend/auth/Login'

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import { Routes, Route } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";
import getApiUrlPath from "./util/getApiUrlPath";
import { useState } from "react";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Home from "./components/Home";
import Unauthorized from "./components/Unauthorized";
import Admin from "./components/Admin";
import Moderator from "./components/Moderator";
import LinkPage from "./components/LinkPage";
import UserDashboard from "./components/UserDashboard";
import TestLogin from "./components/TestLogin";
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
  // alert(ROLES.User);
  return (
    <>
      {/* <Login/> */}
      <GlobalContext.Provider value={{ apiUrl }}>
        {/* <BrowserRouter>
          <Routes>

          </Routes>
        </BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/home" element={<Home />} />
            {/* <Route path="/linkpage" element={<LinkPage />} /> */}

            <Route element={<RequireAuth allowedRole={ROLES.User} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/linkpage" element={<LinkPage />} />
              <Route path="/testlogin" element={< TestLogin/>} />
              <Route path="/userdashboard" element={<UserDashboard />} />
            </Route>

            <Route element={<RequireAuth allowedRole={ROLES.Admin} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route element={<RequireAuth allowedRole={ROLES.Moderator} />}>
              <Route path="/moderator" element={<Moderator />} />
            </Route>
          </Route>
        </Routes>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
