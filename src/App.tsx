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

const ROLES = {
  User: 2001,
  Moderator: 1984,
  Admin: 5151,
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
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Moderator]} />}>
              <Route path="/moderator" element={<Moderator />} />
            </Route>
          </Route>
        </Routes>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
