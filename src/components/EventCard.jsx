import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { defaultEventPhoto } from "../utils/constants";

function EventCard({ event, eventType }) {
  return (
    <Col key={event._id} bg="primary">
      <Card>
        <Card.Img variant="top" src={event.imageUrl || defaultEventPhoto} />
        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Text>{event.review}</Card.Text>
          <Link to={`/${eventType}/${event._id}`}>More Info</Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default EventCard;
