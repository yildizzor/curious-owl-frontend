import { useState, useContext } from "react";
import axios from "axios";
import { API_URL, getSidebarMenuItem } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import ButtonStatus from "../common/ButtonStatus";

function AddTheater({ selectedType }) {
  const { getToken, user } = useContext(AuthContext);

  // state variables to handle form field changes
  const [name, setName] = useState("");
  const [actorsName, setActorsName] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [writerName, setWriterName] = useState("");
  const [typeOfTheater, setTypeOfTheater] = useState("");
  const [theaterPlace, setTheaterPlace] = useState("");
  const [date, setDate] = useState("");
  const [ageLimit, setAgeLimit] = useState(0);
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

  const handleAddTheater = (event) => {
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
    requestBody.append("directorName", directorName);
    requestBody.append("writerName", writerName);
    requestBody.append("actorsName", actorsName);
    requestBody.append("typeOfTheater", typeOfTheater);
    requestBody.append("theaterPlace", theaterPlace);
    requestBody.append("date", date);
    requestBody.append("ageLimit", ageLimit);
    requestBody.append("imageUrl", imageUrl);
    requestBody.append("review", review);
    requestBody.append("createdBy", user._id);

    setIsAxiosInProgress(true);
    axios
      .post(`${API_URL}/api/theaters`, requestBody, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        setSuccessMessage("Theater is added successfully");
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
        onSubmit={handleAddTheater}
      >
        <div className="col-12">
          <label className="form-label">Theater Name: </label>
          <input
            type="text"
            name="name"
            className={getClassName("name")}
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.name
              ? errors.name
              : "Theater Name field is required!"}
          </div>
        </div>

        <div className="col-12">
          <label className="form-label">Cast: </label>
          <input
            type="text"
            name="actorsName"
            className={getClassName("actorsName")}
            required
            value={actorsName}
            onChange={(e) => setActorsName(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.actorsName
              ? errors.actorsName
              : "Cast field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Director(s) Name: </label>
          <input
            type="text"
            name="directorName"
            className={getClassName("directorName")}
            required
            value={directorName}
            onChange={(e) => setDirectorName(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.directorName
              ? errors.directorName
              : "Director(s) field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Writer(s) Name: </label>
          <input
            type="text"
            name="writerName"
            className={getClassName("writerName")}
            required
            value={writerName}
            onChange={(e) => setWriterName(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.writerName
              ? errors.writerName
              : "Writer(s) field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Theater Type: </label>
          <input
            type="text"
            name="typeOfTheater"
            className={getClassName("typeOfTheater")}
            required
            value={typeOfTheater}
            onChange={(e) => setTypeOfTheater(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.typeOfTheater
              ? errors.typeOfTheater
              : "Theater Type field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Theater Place: </label>
          <input
            type="text"
            name="theaterPlace"
            className={getClassName("theaterPlace")}
            required
            value={theaterPlace}
            onChange={(e) => setTheaterPlace(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.theaterPlace
              ? errors.theaterPlace
              : "Theater Type field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Date: </label>
          <input
            type="date"
            name="date"
            className={getClassName("date")}
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.date ? errors.date : "Date field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Age Limit</label>
          <input
            type="number"
            name="ageLimit"
            className={getClassName("ageLimit")}
            required
            value={ageLimit}
            onChange={(e) => setAgeLimit(e.target.value)}
            min={0}
            max={150}
          />
          <div className="invalid-feedback">
            {errors && errors.ageLimit
              ? errors.ageLimit
              : "Age Limit field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Photo of Theater:</label>
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
            text="Add Theater"
            inProgressText="Adding Theater..."
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

export default AddTheater;
