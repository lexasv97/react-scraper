import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { useContext, useState } from "react"

const Navbar = () => {

    // const { isLoggedIn, user } = useContext(AuthContext);

    const getToken = () => {
        return localStorage.getItem('authToken')
    }

    return (
        <nav>
            <div>
                <div>
                    {
                        !getToken() && <Link to='/login'>
                            <span>Login</span>
                        </Link>
                    }
                    <Link to='/'>Gamestop</Link>
                    <Link to='/amazon'>Amazon</Link>
                </div>
                <hr />
            </div>
        </nav>
    )
}

export default Navbar