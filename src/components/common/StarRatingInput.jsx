import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./StarRatingInput.css";

function StarRatingInput({ initialValue, onChange }) {
  const [rating, setRating] = useState(initialValue);

  useEffect(() => {
    setRating(initialValue);
  }, [initialValue]);

  const handleMouseEnter = (value) => {
    setRating(value);
  };

  const handleMouseLeave = () => {
    setRating(initialValue);
  };

  const handleClick = (value) => {
    setRating(value);
    onChange(value); // Pass the rating to the parent component or update the backend
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              style={{ display: "none" }}
            />
            <FontAwesomeIcon
              icon={faStar}
              className="star"
              onMouseEnter={() => handleMouseEnter(ratingValue)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(ratingValue)}
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              size="lg"
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRatingInput;
