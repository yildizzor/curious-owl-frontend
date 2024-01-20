import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";
import "./Signup.css";
import backgroundImg from "../assets/owl1.jpeg";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handleName = (event) => setName(event.target.value);

  const handleSignup = (event) => {
    event.preventDefault();

    const requestBody = { email, password, name };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data);
        }
      });
  };

  return (
    <div className="Signup-container">
      <img className="Signup-bg" src={backgroundImg} alt="background-img" />

      <div className="Signup">
        <h1>Sign Up</h1>

        <form onSubmit={handleSignup}>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
          <label>Name: </label>
          <input type="text" name="name" value={name} onChange={handleName} />

          <button>Sign Up</button>
          {errors &&
            Object.keys(errors)
              .filter((element) => {
                const value = errors[element];
                return value !== undefined && value !== null && value !== "";
              })
              .map((element) => {
                return (
                  <p key={element} className="error-message">
                    {errors[element]}
                  </p>
                );
              })}

          <p>Do you have an account?</p>
          <Link to={"/login"}> Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
