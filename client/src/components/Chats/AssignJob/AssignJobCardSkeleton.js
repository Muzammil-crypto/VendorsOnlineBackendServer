import TextSkeleton from '../../Utils/Skeleton/TextSkeleton';
import RectangleSkeleton from '../../Utils/Skeleton/RectangleSkeleton';

const AssignJobCardSkeleton = () => {
  return (
    <div className="mx-2 flex min-w-max max-w-xs flex-col items-center py-2 pl-4 first:pl-0">
      <TextSkeleton size="lg" className="w-28" />

      <TextSkeleton size="md" className="w-10" />
      <div className="mt-1">
        <RectangleSkeleton className="mt-1 h-6 w-16 rounded-md" />
      </div>
    </div>
  );
};

export default AssignJobCardSkeleton;
