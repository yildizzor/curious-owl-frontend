import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import "./Events.css";
import AllEventList from "../../components/AllEventList";
import EventSidebar from "../../components/EventSidebar";

function Events(props) {
  const [events, setEvents] = useState({});
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(true);

  console.log(events);
  const getAllEvents = () => {
    setIsAxiosInProgress(true);
    axios
      .get(`${API_URL}/api/events`)
      .then((response) => setEvents(response.data))
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.detail);
        }
      })
      .finally(() => setIsAxiosInProgress(false));
  };

  useEffect(() => getAllEvents(), []);

  return (
    <EventSidebar pageName={"All Events"}>
      <AllEventList events={events} isLoading={isAxiosInProgress} />
    </EventSidebar>
  );
}

export default Events;
