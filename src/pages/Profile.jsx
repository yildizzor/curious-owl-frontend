import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import "./Profile.css";
import backgroundImg from "../assets/owl1.jpeg";
import { AuthContext } from "../context/auth.context";

function Profile() {
  const { user, getToken, storeToken, authenticateUser } =
    useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [country, setCountry] = useState(user.country);
  const [imageUrl, setImageUrl] = useState(user.imageUrl);
  const [errors, setErrors] = useState(undefined);
  const [previewUrl, setPreviewUrl] = useState(user.imageUrl);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log(imageUrl);
    if (typeof imageUrl === "string") {
      return;
    }

    const objectUrl = URL.createObjectURL(imageUrl);

    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [imageUrl]);

  const handlePassword = (event) => setPassword(event.target.value);
  const handleCountry = (event) => setCountry(event.target.value);
  const handleFileUpload = (event) => setImageUrl(event.target.files[0]);

  const handleSignup = (event) => {
    event.preventDefault();

    const requestBody = new FormData();

    requestBody.append("email", user.email);
    requestBody.append("password", password);
    requestBody.append("country", country);
    requestBody.append("imageUrl", imageUrl);

    console.log(requestBody, country);
    axios
      .put(`${API_URL}/api/user`, requestBody, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        setSuccess(true);
      })
      .catch((error) => {
        setSuccess(false);
        if (error.response) {
          setErrors(error.response.data);
        }
      });
  };

  return (
    <div className="personal-form-container m-4">
      <img
        className="personal-form-bg"
        src={backgroundImg}
        alt="background-img"
      />

      <div className="personal-form col-12 col-sm-6 col-lg-4">
        <form className="row g-2" onSubmit={handleSignup}>
          <div className="col-12">
            <label className="form-label">Name: {user.name}</label>
          </div>
          <div className="col-12">
            <label className="form-label">Email: {user.email}</label>
          </div>
          <div className="col-12">
            <label className="form-label">Profile Photo:</label>
            <br />
            {previewUrl && (
              <img
                src={previewUrl}
                className="avatar-image rounded-circle my-3"
                alt="profile photo"
              ></img>
            )}
            <input
              type="file"
              className="form-control mb-2"
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
              Update Profile
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
          {success && (
            <div className="success-message">Profile is successfully updated</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;
