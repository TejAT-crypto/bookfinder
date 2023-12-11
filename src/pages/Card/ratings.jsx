import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating, location }) => {
  const filledStars = Math.floor(rating);
  const decimalPart = rating % 1;

  return (
    <div className="flex items-center">
      <div>
        {[...Array(filledStars)].map((_, index) => (
          <FontAwesomeIcon key={index} icon={solidStar} className="text-yellow-500" />
        ))}
        {decimalPart > 0 && decimalPart < 1 && (
          <FontAwesomeIcon icon={halfStar} className="text-yellow-500" />
        )}
        {[...Array(5 - filledStars - (decimalPart > 0 ? 1 : 0))].map((_, index) => (
          <FontAwesomeIcon key={index} icon={solidStar} className="text-gray-300" />
        ))}
      </div>
      <span className="ml-2">{location}</span>
    </div>
  );
};

export default StarRating;
