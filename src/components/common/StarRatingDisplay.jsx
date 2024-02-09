import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function StarRatingDisplay({ rating, displayAllStars = true }) {
  // Generate an array of length equal to the rating
  const stars = Array.from({ length: rating }, (_, index) => index);
  const maxRating = 5;

  return displayAllStars ? (
    <div>
      {[...Array(maxRating)].map((_, index) => (
        <FontAwesomeIcon
          icon={faStar}
          key={index}
          color={index < rating ? "#ffc107" : "#e4e5e9"}
          size="lg"
        />
      ))}
    </div>
  ) : (
    <div>
      {stars.map((_, index) => (
        <FontAwesomeIcon icon={faStar} key={index} color="#ffc107" size="lg" />
      ))}
    </div>
  );
}

export default StarRatingDisplay;
