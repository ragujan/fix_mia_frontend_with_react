import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const UserDashboard = () => {
    const authContext = useAuth();
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <br />
            <h2>Private</h2>
            <Link to="/">Home</Link>
            <Link to="/admin">Admin Page</Link>
            <Link to="/linkpage">Link Page</Link>

            <br />
            <br />
            <br />
            <h1>{authContext?.auth.refreshToken}</h1>
            <h1>{authContext?.auth.userType}</h1>
            <h1>{authContext?.auth.user}</h1>
            <h1>{authContext?.auth.role}</h1>
        </section>
    )
}

export default UserDashboard 