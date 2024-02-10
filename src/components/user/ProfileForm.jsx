import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_URL, avatar } from "../../utils/constants";
import { AuthContext } from "../../context/auth.context";
import "./ProfileForm.css";
import ButtonStatus from "../common/ButtonStatus";
import { backgroundImg } from "../../utils/constants";

function ProfileForm() {
  const { user, getToken, storeToken, authenticateUser } =
    useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [country, setCountry] = useState(user.country);
  const [imageUrl, setImageUrl] = useState(user.imageUrl);

  // state variables to handle success and error messages with form submissions and component errors
  const [errors, setErrors] = useState(undefined);
  const [previewUrl, setPreviewUrl] = useState(user.imageUrl);
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState("");

  const getClassName = (fieldName, defaultClassNames = "form-control") => {
    if (errors) {
      return `${defaultClassNames} ${
        errors[fieldName] ? "is-invalid" : "is-valid"
      }`;
    }
    return defaultClassNames;
  };

  useEffect(() => {
    console.log(imageUrl);
    if (!imageUrl || typeof imageUrl === "string") {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    setSuccess(false);
    setErrors(undefined);

    setValidated("");
    const form = event.currentTarget;
    if (form.checkValidity() == false) {
      event.stopPropagation();
      setValidated("was-validated");
      return;
    }

    const requestBody = new FormData();
    requestBody.append("email", user.email);
    requestBody.append("password", password);
    requestBody.append("country", country);
    requestBody.append("imageUrl", imageUrl);

    setIsAxiosInProgress(true);
    axios
      .put(`${API_URL}/api/user`, requestBody, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        storeToken(response.data.authToken);
        setSuccess(true);
        setTimeout(() => authenticateUser(), 2000);
      })
      .catch((error) => {
        setSuccess(false);
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
        }, 1000);
      });
  };

  return (
    <div className="personal-form-container m-4 col-lg-9 col-12 static-text">
      <img
        className="personal-form-bg"
        src={backgroundImg}
        alt="background-img"
      />

      <div className="personal-form col-10 col-sm-9 col-md-8 col-xl-7">
        <form
          className={`row g-2 ${validated}`}
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="col-8">
            <div className="col-12">
              <label className="form-label">Name: {user.name}</label>
            </div>
            <div className="col-12">
              <label className="form-label">Email: {user.email}</label>
            </div>
          </div>
          <div className="col-4">
            <img
              src={previewUrl || avatar}
              className="float-right avatar-image rounded-circle"
              alt="profile photo"
            ></img>
          </div>
          <div className="col-3"></div>
          <div className="col-9">
            <input
              type="file"
              className={getClassName("imageUrl")}
              name="imageUrl"
              onChange={handleFileUpload}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={getClassName("password")}
              value={password}
              onChange={handlePassword}
            />
            <div className="invalid-feedback">
              {errors && errors.password
                ? errors.password
                : "Password field error occurs!"}
            </div>
          </div>
          <div className="col-12">
            <label className="form-label">Country</label>
            <input
              type="text"
              name="country"
              className={getClassName("country", "form-control mb-3")}
              value={country}
              onChange={handleCountry}
            />
            <div className="invalid-feedback">
              {errors && errors.country
                ? errors.country
                : "Country field error occurs!"}
            </div>
          </div>
          <div className="col-12">
            <ButtonStatus
              inProgress={isAxiosInProgress}
              text="Update Profile"
              inProgressText="Updating Profile..."
            />
          </div>

          {errors && errors.message && (
            <div className="error-message">{errors.message}</div>
          )}

          {success && (
            <div className="success-message">
              Profile is successfully updated
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
