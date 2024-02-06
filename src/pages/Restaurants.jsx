import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import EventSidebar from "../components/EventSidebar";

function Restaurants(props) {
  const [restaurants, setRestaurants] = useState([]);

  const getAllRestaurants = () => {
    axios
      .get(`${API_URL}/api/restaurants`)
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => getAllRestaurants(), []);

  return (
    <EventSidebar pageName="Restaurants">
      <div className="events">
        {restaurants.map((restaurant) => {
          return (
            <div className="event" key={restaurant._id}>
              <Link to={`/restaurants/${restaurant._id}`}>
                <h3>{restaurant.restaurantsName}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </EventSidebar>
  );
}

export default Restaurants;
