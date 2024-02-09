import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { AuthContext } from "../../context/auth.context";
import { backgroundImg } from "../../utils/constants";
import "./Login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");
    setErrorMessage(undefined);

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
    <div className="login-form-container m-4 static-text">
      <img className="login-form-bg" src={backgroundImg} alt="background-img" />

      <div className="login-form col-12 col-sm-6 col-lg-4">
        <form className="row g-2" onSubmit={handleSubmit}>
          <div className="col-12">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={handleEmail}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div className="col-12 mt-5">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>

          {emailError && <div className="error-message">{emailError}</div>}
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="col-12 mb-5">
            <p>Don't you have an account?</p>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
