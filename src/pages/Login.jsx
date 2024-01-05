import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = { email, password };
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);

        navigate("/profile"); // <== ADD
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
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

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Do you have an account?</p>
      <Link to={"/signup"}>Sign Up</Link>
    </div>
  );
}

export default Login;
