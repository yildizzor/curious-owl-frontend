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
  const [country, setCountry] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handleName = (event) => setName(event.target.value);
  const handleCountry = (event) => setCountry(event.target.value);
  const handleFileUpload = (event) => setImageUrl(event.target.files[0]);

  const handleSignup = (event) => {
    event.preventDefault();

    const requestBody = new FormData();

    requestBody.append("email", email);
    requestBody.append("password", password);
    requestBody.append("name", name);
    requestBody.append("country", country);
    requestBody.append("imageUrl", imageUrl);

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
          <label>Profile Photo: </label>
          <input
            type="file"
            name="imageUrl"
            onChange={handleFileUpload}
          />

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

          <label>Country: </label>
          <input
            type="text"
            name="country"
            value={country}
            onChange={handleCountry}
          />
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
