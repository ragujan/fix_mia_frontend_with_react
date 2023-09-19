// import Login from './frontend/auth/Login'

import Login from "./frontend/auth/Login";
import SignUp from "./frontend/auth/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalContext } from "./util/GlobalContext";
import getApiUrlPath from "./util/getApiUrlPath";
import { useState } from "react";

function App() {
  const [apiUrl] = useState(getApiUrlPath());

  return (
    <>

      {/* <Login/> */}
      <GlobalContext.Provider value={{apiUrl}}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
