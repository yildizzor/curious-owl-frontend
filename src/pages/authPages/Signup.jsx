import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import "./Signup.css";
import { backgroundImg, avatar } from "../../utils/constants";
import ButtonStatus from "../../components/common/ButtonStatus";

function Signup(props) {
  // state variables to handle form field changes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [imageUrl, setImageUrl] = useState(avatar);

  // state variables to handle success and error messages with form submissions and component errors
  const [errors, setErrors] = useState(undefined);
  const [previewUrl, setPreviewUrl] = useState(avatar);
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

    setValidated("");
    const form = event.currentTarget;
    if (form.checkValidity() == false) {
      event.stopPropagation();
      setValidated("was-validated");
      return;
    }

    const requestBody = new FormData();
    requestBody.append("email", email);
    requestBody.append("password", password);
    requestBody.append("name", name);
    requestBody.append("country", country);
    requestBody.append("imageUrl", imageUrl);

    setIsAxiosInProgress(true);
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        setTimeout(() => {
          navigate("/login");
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

  return (
    <div className="signup-form-container m-4 static-text">
      <img
        className="signup-form-bg"
        src={backgroundImg}
        alt="background-img"
      />

      <div className="signup-form col-12 col-sm-6 col-lg-4">
        <form
          className={`row g-2 ${validated}`}
          noValidate
          onSubmit={handleSignup}
        >
          <div className="col-8">
            <div className="col-12">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className={getClassName("name")}
                value={name}
                required
                onChange={handleName}
              />
              <div className="invalid-feedback">
                {errors && errors.name
                  ? errors.name
                  : "Name field is required!"}
              </div>
            </div>
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
              className={getClassName("imageUrl", "form-control float-right")}
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
          <div className="col-12">
            <label className="form-label">Country</label>
            <input
              type="text"
              name="country"
              className={getClassName("country", "form-control mb-3")}
              required
              value={country}
              onChange={handleCountry}
            />
            <div className="invalid-feedback">
              {errors && errors.country
                ? errors.country
                : "Country field is required!"}
            </div>
          </div>
          <div className="col-12">
            <ButtonStatus
              inProgress={isAxiosInProgress}
              text="Signup"
              inProgressText="Signup in progress..."
            />
          </div>

          {errors && errors.message && (
            <div className="error-message">{errors.message}</div>
          )}

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
