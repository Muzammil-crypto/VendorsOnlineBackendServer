import { StarIcon } from '@heroicons/react/solid';

const RatingInput = ({ value, setValue, disabled, className }) => {
  return (
    <div className={`inline-flex ${className}`}>
      {[...Array(5)].map((star, i) => {
        return (
          <StarIcon
            key={i}
            color={i < value ? '#ffc107' : '#fff'}
            className={`h-5 w-5 ${disabled ? '' : 'cursor-pointer'} `}
            onClick={() => !disabled && setValue(i + 1)}
          />
        );
      })}
    </div>
  );
};

export default RatingInput;
