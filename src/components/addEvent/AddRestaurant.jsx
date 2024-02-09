import { useState, useContext } from "react";
import axios from "axios";
import { API_URL, getSidebarMenuItem } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import ButtonStatus from "../common/ButtonStatus";

function AddRestaurant({ selectedType }) {
  const { getToken, user } = useContext(AuthContext);

  // state variables to handle form field changes
  const [name, setName] = useState("");
  const [typeOfCuisine, setTypeOfCuisine] = useState("");
  const [restaurantPlace, setRestaurantPlace] = useState("");
  const [establishDate, setEstablishDate] = useState("");
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

  const handleAddRestaurant = (event) => {
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
    requestBody.append("typeOfCuisine", typeOfCuisine);
    requestBody.append("restaurantPlace", restaurantPlace);
    requestBody.append("establishDate", establishDate);
    requestBody.append("ageLimit", ageLimit);
    requestBody.append("imageUrl", imageUrl);
    requestBody.append("review", review);
    requestBody.append("createdBy", user._id);

    setIsAxiosInProgress(true);
    axios
      .post(`${API_URL}/api/restaurants`, requestBody, {
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
        onSubmit={handleAddRestaurant}
      >
        <div className="col-12">
          <label className="form-label">Restaurant Name: </label>
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
              : "Restaurant Name field is required!"}
          </div>
        </div>

        <div className="col-12">
          <label className="form-label">Cuisine: </label>
          <input
            type="text"
            name="typeOfCuisine"
            className={getClassName("typeOfCuisine")}
            required
            value={typeOfCuisine}
            onChange={(e) => setTypeOfCuisine(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.typeOfCuisine
              ? errors.typeOfCuisine
              : "Cuisine field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Place: </label>
          <input
            type="text"
            name="restaurantPlace"
            className={getClassName("restaurantPlace")}
            required
            value={restaurantPlace}
            onChange={(e) => setRestaurantPlace(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.restaurantPlace
              ? errors.restaurantPlace
              : "Place field is required!"}
          </div>
        </div>

        <div className="col-12">
          <label className="form-label">Date: </label>
          <input
            type="date"
            name="establishDate"
            className={getClassName("establishDate")}
            required
            value={establishDate}
            onChange={(e) => setEstablishDate(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.establishDate
              ? errors.establishDate
              : "Date field is required!"}
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
              : "Date field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Photo of Restaurant:</label>
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
            text="Add Restaurant"
            inProgressText="Adding Restaurant..."
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

export default AddRestaurant;
