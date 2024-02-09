import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../utils/constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import MultilineCardText from "../common/MultilineCardText";
import ShowWithTooltip from "../common/ShowWithTooltip";
import StarRatingDisplay from "../common/StarRatingDisplay";

function ReviewCard({ review, eventType, setSuccessMessage, setShowEdit }) {
  const { user, getToken, isLoggedIn } = useContext(AuthContext);

  const [error, setError] = useState("");

  const deleteReview = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/${eventType}/${review.event}/reviews/${review._id}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      setSuccessMessage("Review is successfully deleted");
    } catch (err) {
      if (err.response) setError(err.response.data);
      else setError("An error occurs while review deletion");
    }
  };

  return (
    <Card className="col-11">
      <Card.Body>
        <Card.Title>Review by {review.createdBy.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <StarRatingDisplay rating={review.rating} />
        </Card.Subtitle>
        <MultilineCardText>{review.comment}</MultilineCardText>
        {isLoggedIn && user._id === review.createdBy._id && (
          <ShowWithTooltip tooltipText={"Edit Review"} placement="bottom">
            <Button variant="link" onClick={() => setShowEdit(true)}>
              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
            </Button>
          </ShowWithTooltip>
        )}
        {isLoggedIn && user._id === review.createdBy._id && (
          <ShowWithTooltip tooltipText={"Delete Review"} placement="bottom">
            <Button variant="link" onClick={deleteReview}>
              <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
            </Button>
          </ShowWithTooltip>
        )}
        {error && <Card.Footer>{error}</Card.Footer>}
      </Card.Body>
    </Card>
  );
}

export default ReviewCard;
