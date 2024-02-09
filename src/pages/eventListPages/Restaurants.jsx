import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import EventSidebar from "../../components/EventSidebar";
import EventList from "../../components/EventList";

function Restaurants(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(true);

  const getAllRestaurants = () => {
    setIsAxiosInProgress(true);

    axios
      .get(`${API_URL}/api/restaurants`)
      .then((response) => {
        console.log(response.data);
        setRestaurants(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsAxiosInProgress(false));
  };

  useEffect(() => getAllRestaurants(), []);

  return (
    <EventSidebar pageName="Restaurants">
      <EventList
        events={restaurants}
        eventType="restaurants"
        isLoading={isAxiosInProgress}
      />
    </EventSidebar>
  );
}

export default Restaurants;
