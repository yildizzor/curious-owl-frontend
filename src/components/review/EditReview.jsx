import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { AuthContext } from "../../context/auth.context";
import StarRatingInput from "../common/StarRatingInput";
import UnderlineInput from "../common/UndelineInput";
import ShowWithTooltip from "../common/ShowWithTooltip";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPen } from "@fortawesome/free-solid-svg-icons";

function EditReview({ review, eventType, setReviewUpdated, setShowEdit }) {
  const { getToken } = useContext(AuthContext);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const [errors, setErrors] = useState(undefined);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/${eventType}/${review.event}/reviews/${review._id}`)
      .then((response) => {
        const { rating, comment } = response.data;
        setRating(rating);
        setComment(comment);
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data);
        }
      });
  }, []);

  const handleUpdateReview = (event) => {
    event.preventDefault();

    setErrors(undefined);
    const requestBody = {
      rating,
      comment,
    };

    axios
      .put(
        `${API_URL}/api/${eventType}/${review.event}/reviews/${review._id}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      )
      .then((response) => {
        setShowEdit(false);
        setReviewUpdated(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data);
        }
      });
  };

  return (
    <div className="col-11">
      <form className="row g-2" onSubmit={handleUpdateReview}>
        <div className="col-12">
          <label> Rating: </label>
          <StarRatingInput initialValue={rating} onChange={setRating} />
        </div>

        <div className="col-12">
          <label>Review: </label>
          <UnderlineInput
            type="textarea"
            className="form-control float-right"
            rows={5}
            cols={100}
            maxLength={400}
            name="comment"
            value={comment}
            onChange={setComment}
          />
        </div>
        <div className="col-12">
          <ShowWithTooltip tooltipText={"Update Review"} placement="bottom">
            <Button variant="link" type="submit">
              <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
            </Button>
          </ShowWithTooltip>
          <ShowWithTooltip tooltipText={"Cancel Update"} placement="bottom">
            <Button variant="link" onClick={() => setShowEdit(false)}>
              <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
            </Button>
          </ShowWithTooltip>
        </div>
        {errors && errors.message && (
          <div className="error-message">{errors.message}</div>
        )}
      </form>
    </div>
  );
}

export default EditReview;
