import { Row, Spinner } from "react-bootstrap";
import EventCard from "./EventCard";

function EventList({ events, eventType, isLoading }) {
  const isEventsEmpty = () => events && events.length == 0;

  return (
    <div className="container-fluid mt-3">
      <h2>
        {eventType.charAt(0).toUpperCase() + eventType.slice(1).toLowerCase()}
      </h2>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isLoading && isEventsEmpty() && (
        <div className="error-message">There is no events available</div>
      )}
      {!isLoading && !isEventsEmpty() && (
        <Row xs={1} md={3} className="g-4">
          {events.map((event) => {
            return (
              <EventCard key={event._id} event={event} eventType={eventType} />
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default EventList;
