import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

import { post } from "../services/authService";

const UserSignup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { authenticateUser, storeToken } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password};

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    post('/auth/signup', requestBody)
      .then((response) => {
        //console.log("Created user ===>", response.data)
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  }

  return (

    <div style={{ height: '70vh' }}>
      <div>
        <span>Register</span>

        <form onSubmit={handleSignupSubmit}>

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
            <button type="submit">Signup</button>
          </div>

          <div>
            <span>Already have account?
              <Link to="/login">Login</Link>
            </span>
          </div>

          {errorMessage && <p>{errorMessage}</p>}

        </form>

      </div>
    </div>


  )
}

export default UserSignup