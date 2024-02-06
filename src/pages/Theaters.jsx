import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import EventSidebar from "../components/EventSidebar";

function Theaters(props) {
  const [theaters, setTheaters] = useState([]);

  const getAllTheaters = () => {
    axios
      .get(`${API_URL}/api/theaters`)
      .then((response) => setTheaters(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => getAllTheaters(), []);

  return (
    <EventSidebar pageName="Theaters">
      <div className="events">
        {theaters.map((theater) => {
          return (
            <div className="event" key={theater._id}>
              <Link to={`/theaters/${theater._id}`}>
                <h3>{theater.theatersName}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </EventSidebar>
  );
}

export default Theaters;
