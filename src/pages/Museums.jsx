import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import EventSidebar from "../components/EventSidebar";

function Museums(props) {
  const [museums, setMuseums] = useState([]);

  const getAllMuseums = () => {
    axios
      .get(`${API_URL}/api/museums`)
      .then((response) => setMuseums(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => getAllMuseums(), []);

  return (
    <EventSidebar pageName="Museums">
      <div className="events">
        {museums.map((museum) => {
          return (
            <div className="event" key={museum._id}>
              <Link to={`/museums/${museum._id}`}>
                <h3>{museum.museumName}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </EventSidebar>
  );
}

export default Museums;
