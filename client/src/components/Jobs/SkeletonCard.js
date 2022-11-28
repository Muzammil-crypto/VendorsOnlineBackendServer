import RectangleSkeleton from '../Utils/Skeleton/RectangleSkeleton';
import TextSkeleton from '../Utils/Skeleton/TextSkeleton';

const SkeletonCard = () => {
  return (
    <div className="w-full border border-b-4 border-gray-100 border-b-primary-500 shadow">
      {/* image section */}
      <div className="relative py-24">
        <RectangleSkeleton className="absolute inset-0" />
      </div>

      {/* info section */}
      <div className="px-6 py-3">
        <TextSkeleton size="lg" className="w-1/3" />

        <TextSkeleton size="md" className="w-2/3" />

        <TextSkeleton size="sm" className="w-1/6" />
      </div>
    </div>
  );
};

export default SkeletonCard;
