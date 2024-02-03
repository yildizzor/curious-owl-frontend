import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    setErrors(undefined);

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
    <div className="signup-form-container m-4 static-text">
      <img
        className="signup-form-bg"
        src={backgroundImg}
        alt="background-img"
      />

      <div className="signup-form col-12 col-sm-6 col-lg-4">
        <form className="row g-2" onSubmit={handleSignup}>
          <div className="col-8">
            <div className="col-12">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={name}
                onChange={handleName}
              />
            </div>
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
          </div>
          <div className="col-4">
            {previewUrl && (
              <img
                src={previewUrl}
                className="float-right avatar-image rounded-circle"
                alt="profile photo"
              ></img>
            )}
          </div>
          <div className="col-6"></div>
          <div className="col-6">
            <input
              type="file"
              className="form-control float-right"
              name="imageUrl"
              onChange={handleFileUpload}
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
          <div className="col-12">
            <label className="form-label">Country</label>
            <input
              type="text"
              name="country"
              className="form-control mb-3"
              value={country}
              onChange={handleCountry}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </div>

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

          <div className="col-12 mb-5">
            <p>Do you have an account?</p>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
