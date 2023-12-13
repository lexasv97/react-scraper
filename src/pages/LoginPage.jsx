import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/authService";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    post('/auth/login', requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        // console.log('JWT token', response.data.authToken);
        //console.log("DATA =====>", response.data)
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  return (
    <div style={{height:'70vh'}}>
      <div>
        <span >Login</span>

        <form onSubmit={handleLoginSubmit}>

          <div>
            <input
              placeholder="email"
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>

          <div>
            <input
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>

          <div>
            <button type="submit">Login</button>
          </div>

          <div>
            <span>Don't have an account yet?
              <Link to="/signup">Sign Up</Link>
            </span>
          </div>

          {errorMessage && <p>{errorMessage}</p>}

        </form>

      </div>
    </div>
  )
}

export default UserLogin