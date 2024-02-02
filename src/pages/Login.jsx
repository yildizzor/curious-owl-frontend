import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { AuthContext } from "../context/auth.context";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = { email, password };
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/profile"); // <== ADD
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response);
          const backendErrors = error.response.data;

          if (backendErrors.email) setEmailError(backendErrors.email);

          if (backendErrors.password) setPasswordError(backendErrors.password);

          if (backendErrors.message) setErrorMessage(backendErrors.message);
          
        } else setErrorMessage("Unknown error occurs, please try again");
      });
  };

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <button>Login</button>
      </form>

      {emailError && <p className="error-message">{emailError}</p>}
      {passwordError && <p className="error-message">{passwordError}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Do you have an account?</p>
      <Link to={"/signup"}>Sign Up</Link>
    </div>
  );
}

export default Login;
