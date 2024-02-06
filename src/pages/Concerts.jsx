import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import EventSidebar from "../components/EventSidebar";

function Concerts(props) {
  const [concerts, setConcerts] = useState([]);

  const getAllConcerts = () => {
    axios
      .get(`${API_URL}/api/concerts`)
      .then((response) => setConcerts(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => getAllConcerts(), []);

  return (
    <EventSidebar pageName="Concerts">
      <div className="events">
        {concerts.map((concert) => {
          return (
            <div className="event" key={concert._id}>
              <Link to={`/concerts/${concert._id}`}>
                <h3>{concert.concertName}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </EventSidebar>
  );
}

export default Concerts;
