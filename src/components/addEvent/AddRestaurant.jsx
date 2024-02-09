import { useState, useContext } from "react";
import axios from "axios";
import { API_URL, getSidebarMenuItem } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import ButtonStatus from "../common/ButtonStatus";

function AddRestaurant({ selectedType }) {
  const { getToken, user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [typeOfCuisine, setTypeOfCuisine] = useState("");
  const [restaurantPlace, setRestaurantPlace] = useState("");
  const [establishDate, setEstablishDate] = useState("");
  const [ageLimit, setAgeLimit] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(false);

  const navigate = useNavigate();

  const handleAddRestaurant = (event) => {
    event.preventDefault();

    setErrors(undefined);

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
        if (error.response) {
          setErrors(error.response.data);
          console.log(error.response.data.detail);
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
      <form className="row g-2" onSubmit={handleAddRestaurant}>
        <div className="col-12">
          <label>Restaurant Name: </label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label>Cuisine: </label>
          <input
            type="text"
            name="typeOfCuisine"
            className="form-control"
            value={typeOfCuisine}
            onChange={(e) => setTypeOfCuisine(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Place: </label>
          <input
            type="text"
            name="restaurantPlace"
            className="form-control"
            value={restaurantPlace}
            onChange={(e) => setRestaurantPlace(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label>Date: </label>
          <input
            type="date"
            name="establishDate"
            className="form-control"
            value={establishDate}
            onChange={(e) => setEstablishDate(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Age Limit</label>
          <input
            type="number"
            name="ageLimit"
            className="form-control"
            value={ageLimit}
            onChange={(e) => setAgeLimit(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Photo of Concert:</label>
          <input
            type="file"
            className="form-control float-right"
            name="imageUrl"
            onChange={(e) => setImageUrl(e.target.files[0])}
          />
          <div className="col-12">
            <label>Comment:</label>
            <textarea
              className="form-control float-right"
              rows={5}
              cols={100}
              maxLength={400}
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12">
          <ButtonStatus
            inProgress={isAxiosInProgress}
            text="Add Restaurant"
            inProgressText="Adding Restaurant..."
          />
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

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </form>
    </div>
  );
}

export default AddRestaurant;
