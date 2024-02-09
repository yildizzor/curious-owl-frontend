import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import EventSidebar from "../../components/EventSidebar";
import EventList from "../../components/EventList";

function Theaters(props) {
  const [theaters, setTheaters] = useState([]);
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(true);

  console.log(theaters);
  const getAllTheaters = () => {
    setIsAxiosInProgress(true);
    axios
      .get(`${API_URL}/api/theaters`)
      .then((response) => setTheaters(response.data))
      .catch((error) => console.log(error))
      .finally(() => setIsAxiosInProgress(false));
  };

  useEffect(() => getAllTheaters(), []);

  return (
    <EventSidebar pageName="Theaters">
      <EventList
        events={theaters}
        eventType="theaters"
        isLoading={isAxiosInProgress}
      />
    </EventSidebar>
  );
}

export default Theaters;
