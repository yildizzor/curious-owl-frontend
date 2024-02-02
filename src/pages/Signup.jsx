import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";
import "./Signup.css";
import backgroundImg from "../assets/owl1.jpeg";
import avatar from "../assets/avatar.png";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [imageUrl, setImageUrl] = useState(avatar);
  const [errors, setErrors] = useState(undefined);
  const [previewUrl, setPreviewUrl] = useState(avatar);

  const navigate = useNavigate();

  useEffect(() => {
    if (imageUrl === avatar) {
      setPreviewUrl(avatar);
      return;
    }

    const objectUrl = URL.createObjectURL(imageUrl);

    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [imageUrl]);

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
    <div className="Signup-container m-4">
      <img className="Signup-bg" src={backgroundImg} alt="background-img" />

      <div className="Signup">
        <h1>Sign Up</h1>

        <form className="row g-4" onSubmit={handleSignup}>
          <label>Profile Photo: </label>
          <input type="file" name="imageUrl" onChange={handleFileUpload} />
          {previewUrl && (
            <img src={previewUrl} height="300px" alt="profile photo"></img>
          )}

          <label>Email: </label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={email}
            onChange={handleEmail}
          />
          <label>Password: </label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={handlePassword}
          />
          <label>Name: </label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={handleName}
          />

          <label>Country: </label>
          <input
            type="text"
            name="country"
            className="form-control"
            value={country}
            onChange={handleCountry}
          />
          <button className="btn btn-primary">Sign Up</button>
          {errors &&
            Object.keys(errors)
              .filter((element) => {
                const value = errors[element];
                return value !== undefined && value !== null && value !== "";
              })
              .map((element) => {
                return (
                  <div key={element} className="error-message">
                    {errors[element]}
                  </div>
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
