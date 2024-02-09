import { useState, useContext } from "react";
import axios from "axios";
import { API_URL, getSidebarMenuItem } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import ButtonStatus from "../common/ButtonStatus";

function AddMuseum({ selectedType }) {
  const { getToken, user } = useContext(AuthContext);

  // state variables to handle form field changes
  const [name, setName] = useState("");
  const [typeOfSubject, setTypeOfSubject] = useState("");
  const [museumPlace, setMuseumPlace] = useState("");
  const [builtBy, setBuiltBy] = useState("");
  const [builtDate, setBuiltDate] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [review, setReview] = useState("");

  // state variables to handle success and error messages with form submissions and component errors
  const [errors, setErrors] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState("");
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

  const handleAddMuseum = (event) => {
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
    requestBody.append("name", name);
    requestBody.append("typeOfSubject", typeOfSubject);
    requestBody.append("museumPlace", museumPlace);
    requestBody.append("builtBy", builtBy);
    requestBody.append("builtDate", builtDate);
    requestBody.append("imageUrl", imageUrl);
    requestBody.append("review", review);
    requestBody.append("createdBy", user._id);

    setIsAxiosInProgress(true);
    axios
      .post(`${API_URL}/api/museums`, requestBody, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        setSuccessMessage("Museum is added successfully");
        setTimeout(() => {
          const selectedSidebarMenuItem = getSidebarMenuItem(selectedType);
          navigate(selectedSidebarMenuItem.link);
        }, 2000);
      })
      .catch((error) => {
        setValidated("was-validated");

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
    <div className="add-event col-12 col-sm-10 col-md-8 col-lg-6">
      <form
        className={`row g-2 ${validated}`}
        noValidate
        onSubmit={handleAddMuseum}
      >
        <div className="col-12">
          <label className="form-label">Museum Name: </label>
          <input
            type="text"
            name="name"
            className={getClassName("name")}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.name
              ? errors.name
              : "Museum Name field is required!"}
          </div>
        </div>

        <div className="col-12">
          <label className="form-label">Museum Type: </label>
          <input
            type="text"
            name="typeOfSubject"
            className={getClassName("typeOfSubject")}
            required
            value={typeOfSubject}
            onChange={(e) => setTypeOfSubject(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.typeOfSubject
              ? errors.typeOfSubject
              : "Museum Type field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Museum Place: </label>
          <input
            type="text"
            name="museumPlace"
            className={getClassName("museumPlace")}
            required
            value={museumPlace}
            onChange={(e) => setMuseumPlace(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.museumPlace
              ? errors.museumPlace
              : "Museum Place field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Built By: </label>
          <input
            type="text"
            name="builtBy"
            className={getClassName("builtBy")}
            required
            value={builtBy}
            onChange={(e) => setBuiltBy(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.builtBy
              ? errors.builtBy
              : "Built By field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label>Built Date: </label>
          <input
            type="text"
            name="builtDate"
            className={getClassName("builtDate")}
            required
            value={builtDate}
            onChange={(e) => setBuiltDate(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.builtDate
              ? errors.builtDate
              : "Build Date field is required and should be given as year!"}
          </div>
        </div>

        <div className="col-12">
          <label>Photo of Museum:</label>
          <input
            type="file"
            name="imageUrl"
            className={getClassName("imageUrl", "form-control float-right")}
            onChange={(e) => setImageUrl(e.target.files[0])}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Comment:</label>
          <textarea
            name="review"
            className={getClassName("review")}
            rows={5}
            cols={100}
            maxLength={400}
            required
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.review
              ? errors.review
              : "Comment of event creator is required!"}
          </div>
        </div>
        <div className="col-12">
          <ButtonStatus
            inProgress={isAxiosInProgress}
            text="Add Museum"
            inProgressText="Adding Museum..."
          />
        </div>

        {errors && errors.message && (
          <div className="error-message">{errors.message}</div>
        )}

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </form>
    </div>
  );
}

export default AddMuseum;
