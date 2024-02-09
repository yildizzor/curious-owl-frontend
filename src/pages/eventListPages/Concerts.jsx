import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import EventSidebar from "../../components/EventSidebar";
import EventList from "../../components/EventList";

function Concerts(props) {
  const [concerts, setConcerts] = useState([]);
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(true);

  const getAllConcerts = () => {
    setIsAxiosInProgress(true);
    axios
      .get(`${API_URL}/api/concerts`)
      .then((response) => setConcerts(response.data))
      .catch((error) => console.log(error))
      .finally(() => setIsAxiosInProgress(false));
  };

  useEffect(() => getAllConcerts(), []);

  return (
    <EventSidebar pageName="Concerts">
      <EventList
        events={concerts}
        eventType="concerts"
        isLoading={isAxiosInProgress}
      />
    </EventSidebar>
  );
}

export default Concerts;
