import { Button, Card, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { defaultEventPhoto } from "../utils/constants";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { API_URL } from "../utils/constants";
import axios from "axios";
import ShowWithTooltip from "./common/ShowWithTooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function EventCard({ event, eventType }) {
  const { user, isLoggedIn, getToken } = useContext(AuthContext);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const deleteEvent = async () => {
    try {
      await axios.delete(`${API_URL}/api/${eventType}/${event._id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      console.log("Event is successfully deleted");
      navigate(`/events`);
    } catch (err) {
      if (err.response) setError(err.response.data);
      else setError("An error occurs while event deletion");
    }
  };

  return (
    <Col key={event._id} bg="primary">
      <Card>
        <Card.Img variant="top" src={event.imageUrl || defaultEventPhoto} />
        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Text>{event.review}</Card.Text>
          <Link to={`/${eventType}/${event._id}`}>More Info</Link>
          {isLoggedIn && user._id === event.createdBy && (
            <ShowWithTooltip
              tooltipText={`Delete ${
                eventType.charAt(0).toUpperCase() + eventType.slice(1)
              }`}
              placement="bottom"
            >
              <Button variant="link" onClick={deleteEvent}>
                <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
              </Button>
            </ShowWithTooltip>
          )}
          {error && <Card.Footer>{error}</Card.Footer>}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default EventCard;
