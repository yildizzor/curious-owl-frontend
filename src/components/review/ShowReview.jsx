import ReviewCard from "./ReviewCard";
import EditReview from "./EditReview";
import { useState } from "react";

function ShowReview({ review, eventType, setSuccessMessage }) {
  const [reviewUpdated, setReviewUpdated] = useState(review);
  const [showEdit, setShowEdit] = useState(false);
  return !showEdit ? (
    <ReviewCard
      key={review._id}
      review={reviewUpdated}
      eventType={eventType}
      setSuccessMessage={setSuccessMessage}
      setShowEdit={setShowEdit}
    />
  ) : (
    <EditReview
      key={review._id}
      review={reviewUpdated}
      eventType={eventType}
      setSuccessMessage={setSuccessMessage}
      setShowEdit={setShowEdit}
      setReviewUpdated={setReviewUpdated}
    />
  );
}

export default ShowReview;
