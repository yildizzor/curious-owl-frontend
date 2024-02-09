import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import EventSidebar from "../../components/EventSidebar";
import EventList from "../../components/EventList";

function Museums(props) {
  const [museums, setMuseums] = useState([]);
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(true);

  const getAllMuseums = () => {
    setIsAxiosInProgress(true);

    axios
      .get(`${API_URL}/api/museums`)
      .then((response) => setMuseums(response.data))
      .catch((error) => console.log(error))
      .finally(() => setIsAxiosInProgress(false));
  };

  useEffect(() => getAllMuseums(), []);

  return (
    <EventSidebar pageName="Museums">
      <EventList
        events={museums}
        eventType="museums"
        isLoading={isAxiosInProgress}
      />
    </EventSidebar>
  );
}

export default Museums;
