import { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL,
  dateToString,
  defaultEventPhoto,
} from "../../utils/constants";
import { useParams } from "react-router-dom";
import EventSidebar from "../../components/EventSidebar";
import EventReviews from "../../components/review/EventReviews";
import { Spinner } from "react-bootstrap";

function OneRestaurant(props) {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(undefined);
  const [isAxiosLoading, setIsAxiosLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [errorsOfRestaurant, setErrorsOfRestaurant] = useState(undefined);

  const getOneRestaurant = () => {
    setIsAxiosLoading(true);
    axios
      .get(`${API_URL}/api/restaurants/${restaurantId}`)
      .then((response) => {
        const restaurantData = response.data;

        setRestaurant(restaurantData);
        setReviews(restaurantData.eventReviews);
        setSuccessMessage("");
      })
      .catch((err) => {
        if (err.response) setErrorsOfRestaurant(err.response.data);
        else setErrorsOfRestaurant("An error occurs!");
      })
      .finally(() => setIsAxiosLoading(false));
  };

  useEffect(() => getOneRestaurant(), [successMessage]);

  return (
    <EventSidebar pageName="Restaurants">
      <div className="container-fluid my-4">
        {isAxiosLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {!isAxiosLoading && !restaurant && (
          <div className="error-message">Restaurant cannot be retrieved via API</div>
        )}
        {restaurant && (
          <div className="row g-2">
            <div className="col-lg-7 col-sm-9 col-sm-10 col-xs-12">
              <img
                className="col-11 rounded"
                src={restaurant.imageUrl || defaultEventPhoto}
                alt="restaurant photo"
              ></img>
            </div>

            <div className="col-lg-5 col-md-9 col-sm-10 col-xs-12">
              <div className="col-12">
                <label className="form-label">
                  <b>Restaurant Name:</b> {restaurant.name}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Cuisine:</b> {restaurant.typeOfCuisine}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Restaurant Place:</b> {restaurant.restaurantPlace}
                </label>
              </div>

              <div className="col-12">
                <label className="form-label">
                  <b>Establish Date:</b> {dateToString(restaurant.establishDate)}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Age Limit:</b> {restaurant.ageLimit}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Comment by {restaurant.createdBy.name}:</b> {restaurant.review}
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
      <EventReviews
        reviews={reviews}
        eventAuthorId={restaurant && restaurant.createdBy && restaurant.createdBy._id}
        eventId={restaurantId}
        eventType={"restaurants"}
        setSuccessMessage={setSuccessMessage}
      />
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </EventSidebar>
  );
}

export default OneRestaurant;
