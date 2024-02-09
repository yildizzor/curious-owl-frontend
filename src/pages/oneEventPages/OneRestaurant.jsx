import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, dateToString } from "../../utils/constants";
import { useParams } from "react-router-dom";
import EventSidebar from "../../components/EventSidebar";

function OneRestaurant(props) {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [errorsOfRestaurant, setErrorsOfRestaurant] = useState(undefined);

  const getOneRestaurant = () => {
    axios
      .get(`${API_URL}/api/restaurants/${restaurantId}`)
      .then((response) => setRestaurant(response.data))
      .catch((err) => {
        if (err.response) setErrorsOfRestaurant(err.response.data);
        else setErrorsOfRestaurant("An error occurs!");
      });
  };

  useEffect(() => getOneRestaurant(), []);

  return (
    <EventSidebar pageName="Restaurants">
      <div className="col-md-9">
        <div className="restaurant">
          <div className="personal-form col-12 col-sm-6 col-lg-4">
            <div className="row g-2">
              <div className="col-4">
                <img src={restaurant.imageUrl} alt="restaurant photo"></img>
              </div>

              <div className="col-8">
                <div className="col-12">
                  <label className="form-label">
                    Restaurant Name: {restaurant.name}
                  </label>
                </div>
                <div className="col-12">
                  <label className="form-label">
                    Cuisine: {restaurant.typeOfCuisine}
                  </label>
                </div>
                <div className="col-12">
                  <label className="form-label">
                    Place: {restaurant.restaurantPlace}
                  </label>
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Establish Date: {dateToString(restaurant.establishDate)}
                  </label>
                </div>
                <div className="col-12">
                  <label className="form-label">
                    Age Limit: {restaurant.ageLimit}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EventSidebar>
  );
}

export default OneRestaurant;
