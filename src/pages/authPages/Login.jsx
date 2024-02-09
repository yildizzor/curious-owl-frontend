import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { AuthContext } from "../../context/auth.context";
import { backgroundImg } from "../../utils/constants";
import "./Login.css";
import ButtonStatus from "../../components/common/ButtonStatus";

function Login(props) {
  const { storeToken, authenticateUser } = useContext(AuthContext);

  // state variables to handle form field changes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // state variables to handle success and error messages with form submissions and component errors
  const [errors, setErrors] = useState(undefined);
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(false);
  const [validated, setValidated] = useState("");

  const navigate = useNavigate();

  const getClassName = (fieldName, defaultClassNames = "form-control") => {
    if (errors) {
      return `${defaultClassNames} ${
        errors[fieldName] ? "is-invalid" : "is-valid"
      }`;
    }
    return defaultClassNames;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors(undefined);

    setValidated("");
    const form = event.currentTarget;
    if (form.checkValidity() == false) {
      event.stopPropagation();
      setValidated("was-validated");
      return;
    }

    const requestBody = { email, password };
    setIsAxiosInProgress(true);
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);
        setTimeout(() => {
          storeToken(response.data.authToken);
          authenticateUser();
          navigate("/profile");
        }, 500);
      })
      .catch((error) => {
        setValidated("validated");

        if (error.response) {
          setErrors(error.response.data);
        } else {
          setErrors({ message: "Unexpected error occurs during API call" });
        }
      })
      .finally(() => {
        setTimeout(() => {
          setIsAxiosInProgress(false);
        }, 500);
      });
  };

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  return (
    <div className="login-form-container m-4 static-text">
      <img className="login-form-bg" src={backgroundImg} alt="background-img" />

      <div className="login-form col-12 col-sm-6 col-lg-4">
        <form
          className={`row g-2 ${validated}`}
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={getClassName("email")}
              required
              value={email}
              onChange={handleEmail}
            />
            <div className="invalid-feedback">
              {errors && errors.email
                ? errors.email
                : "Email field is required!"}
            </div>
          </div>

          <div className="col-12">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={getClassName("password")}
              required
              value={password}
              onChange={handlePassword}
            />
            <div className="invalid-feedback">
              {errors && errors.password
                ? errors.password
                : "Password field is required!"}
            </div>
          </div>
          <div className="col-12 mt-5">
            <ButtonStatus
              inProgress={isAxiosInProgress}
              text="Login"
              inProgressText="Login in progress..."
            />
          </div>

          {errors && errors.message && (
            <div className="error-message">{errors.message}</div>
          )}
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
