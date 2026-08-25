import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (newRating: number) => void;
  showValue?: boolean;
  reviewCount?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 18,
  interactive = false,
  onRatingChange,
  showValue = false,
  reviewCount
}) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = rating >= starValue;
          const isHalf = !isFilled && rating >= starValue - 0.5;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRatingChange && onRatingChange(starValue)}
              className={`p-0.5 transition-transform ${
                interactive ? 'hover:scale-125 cursor-pointer focus:outline-none' : 'cursor-default'
              }`}
            >
              <Star
                size={size}
                className={`${
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : isHalf
                    ? 'fill-amber-400/50 text-amber-400'
                    : 'fill-slate-100 text-slate-300'
                } transition-colors`}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="font-semibold text-slate-800 text-sm ml-1">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-slate-500 text-xs ml-0.5">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
