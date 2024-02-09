import { useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { AuthContext } from "../../context/auth.context";
import ButtonStatus from "../common/ButtonStatus";
import StarRatingInput from "../common/StarRatingInput";

function AddReview({ eventId, eventType, setSuccessMessage }) {
  const { getToken, user } = useContext(AuthContext);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState(undefined);
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(false);

  const handleAddReview = (event) => {
    event.preventDefault();

    setErrors(undefined);

    const requestBody = {
      rating,
      comment,
      createdBy: user._id,
    };

    setIsAxiosInProgress(true);
    axios
      .post(`${API_URL}/api/${eventType}/${eventId}/reviews`, requestBody, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        setSuccessMessage("Review is added successfully");
        setRating(0);
        setComment("");
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data);
        }
      })
      .finally(() => {
        setTimeout(() => {
          setIsAxiosInProgress(false);
        }, 500);
      });
  };

  return (
    <div className="col-11">
      <form className="row g-2" onSubmit={handleAddReview}>
        <div className="col-12">
          <label> Rating: </label>
          <StarRatingInput initialValue={rating} onChange={setRating} />
        </div>

        <div className="col-12">
          <label>Review: </label>
          <textarea
            className="form-control float-right"
            rows={5}
            cols={100}
            maxLength={400}
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="col-12">
          <ButtonStatus
            inProgress={isAxiosInProgress}
            text="Add Review"
            inProgressText="Adding Review..."
          />
        </div>

        {errors &&
          Object.keys(errors)
            .filter((element) => {
              const value = errors[element];
              return value !== undefined && value !== null && value !== "";
            })
            .map((element) => {
              return (
                <div key={element} className="error-message">
                  {errors[element]}
                </div>
              );
            })}
      </form>
    </div>
  );
}

export default AddReview;
