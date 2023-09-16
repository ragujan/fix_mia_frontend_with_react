// import Login from './frontend/auth/Login'
import Login from './frontend/auth/Login';
import SignUp from './frontend/auth/SignUp'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {


  return (
    <>
     {/* <Login/> */}
     <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
