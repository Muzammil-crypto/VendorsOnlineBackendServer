import { StarIcon } from '@heroicons/react/solid';

const Rating = ({ reviews, showLength }) => {
  const average = Math.round(
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  );

  return (
    <div className="inline-flex">
      {[...Array(5)].map((star, i) => {
        return (
          <StarIcon
            key={i}
            color={i < average ? '#ffc107' : '#e4e5e9'}
            className="h-4 w-4"
          />
        );
      })}

      {showLength && (
        <span className="ml-1 text-xs text-gray-600">({reviews.length})</span>
      )}
    </div>
  );
};

export default Rating;
