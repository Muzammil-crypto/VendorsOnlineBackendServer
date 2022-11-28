import { forwardRef } from 'react';
import TextSkeleton from '../../Utils/Skeleton/TextSkeleton';

const Suggestions = forwardRef(
  ({ suggestions, isLoading, setLocation }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute z-40 mt-2 w-full rounded border bg-white py-2 text-sm text-gray-800 shadow-md"
      >
        <div className="thin-scrollbar-y max-h-72 w-full divide-y overflow-y-auto">
          {isLoading ? (
            [...new Array(5)].map((_, i) => (
              <div key={i} className="w-full bg-gray-50 p-2">
                <TextSkeleton size="sm" className="w-full" />
              </div>
            ))
          ) : suggestions?.length > 0 ? (
            suggestions.map((suggestion) => (
              <button
                key={suggestion._id}
                className="w-full p-2 transition duration-150 hover:bg-gray-100"
                onClick={() =>
                  setLocation({
                    lat: suggestion.latitude,
                    lng: suggestion.longitude,
                    address: suggestion.formattedAddress,
                  })
                }
              >
                <p className="text-left leading-tight line-clamp-2">
                  {suggestion.formattedAddress}
                </p>
              </button>
            ))
          ) : (
            <div className="w-full p-1 text-center text-gray-700">
              <p>No results found</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Suggestions;
