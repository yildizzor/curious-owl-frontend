import AddReview from "./AddReview";
import { Row } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import ShowReview from "./ShowReview";

function EventReviews({
  reviews,
  eventId,
  eventAuthorId,
  eventType,
  setSuccessMessage,
}) {
  const { isLoggedIn } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="container-fluid mt-5 mx-2">
      {reviews && reviews.length > 0 && <h2>Reviews</h2>}
      {/* Row bootstrap component. It provides kind of table row on the screen  xs= smaal screen , md= medium screen and bigger screen*/}
      <Row xs={1} className="g-4">
        {reviews &&
          reviews.map((review) => {
            return (
              <ShowReview
                key={review._id}
                review={review}
                eventType={eventType}
                setSuccessMessage={setSuccessMessage}
              />
            );
          })}
      </Row>

      {isLoggedIn && eventAuthorId !== user._id && (
        <>
          <h2 className="mt-5">Add Review</h2>
          <AddReview
            eventId={eventId}
            eventType={eventType}
            setSuccessMessage={setSuccessMessage}
          />
        </>
      )}
    </div>
  );
}

export default EventReviews;
