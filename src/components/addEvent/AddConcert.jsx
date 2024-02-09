import { useState, useContext } from "react";
import axios from "axios";
import { API_URL, getSidebarMenuItem } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import ButtonStatus from "../common/ButtonStatus";

function AddConcert({ selectedType }) {
  const { getToken, user } = useContext(AuthContext);

  // state variables to handle form field changes
  const [name, setName] = useState("");
  const [soloistName, setSoloistName] = useState("");
  const [typeOfMusic, setTypeOfMusic] = useState("");
  const [concertPlace, setConcertPlace] = useState("");
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

  const handleAddConcert = (event) => {
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
    requestBody.append("soloistName", soloistName);
    requestBody.append("typeOfMusic", typeOfMusic);
    requestBody.append("concertPlace", concertPlace);
    requestBody.append("date", date);
    requestBody.append("ageLimit", ageLimit);
    requestBody.append("imageUrl", imageUrl);
    requestBody.append("review", review);
    requestBody.append("createdBy", user._id);

    setIsAxiosInProgress(true);
    axios
      .post(`${API_URL}/api/concerts`, requestBody, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        setSuccessMessage("Concert is added successfully");
        setTimeout(() => {
          const selectedSidebarMenuItem = getSidebarMenuItem(selectedType);
          navigate(selectedSidebarMenuItem.link);
        }, 2000);
      })
      .catch((error) => {
        setValidated("validated");

        if (error.response) {
          setErrors(error.response.data);
        } else {
          setErrors({"message": "Unexpected error occurs during API call"})
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
        onSubmit={handleAddConcert}
      >
        <div className="col-12">
          <label className="form-label">Concert Name: </label>
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
              : "Concert Name field is required!"}
          </div>
        </div>

        <div className="col-12">
          <label className="form-label">Soloist Name: </label>
          <input
            type="text"
            name="soloistName"
            className={getClassName("soloistName")}
            required
            value={soloistName}
            onChange={(e) => setSoloistName(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.soloistName
              ? errors.soloistName
              : "Soloist Name field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Music Genre: </label>
          <input
            type="text"
            name="typeOfMusic"
            className={getClassName("typeOfMusic")}
            required
            value={typeOfMusic}
            onChange={(e) => setTypeOfMusic(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.typeOfMusic
              ? errors.typeOfMusic
              : "Music Type field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Concert Place: </label>
          <input
            type="text"
            name="concertPlace"
            className={getClassName("concertPlace")}
            required
            value={concertPlace}
            onChange={(e) => setConcertPlace(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.concertPlace
              ? errors.concertPlace
              : "Concert Place field is required!"}
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
            {errors && errors.date
              ? errors.date
              : "Concert Date field is required!"}
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
          <label className="form-label">Photo of Concert:</label>
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
            text="Add Concert"
            inProgressText="Adding Concert..."
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

export default AddConcert;
