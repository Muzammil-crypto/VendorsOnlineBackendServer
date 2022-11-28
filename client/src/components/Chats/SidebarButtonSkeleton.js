import TextSkeleton from '../Utils/Skeleton/TextSkeleton';
import CircleSkeleton from '../Utils/Skeleton/CircleSkeleton';

const SidebarButtonSkeleton = () => {
  return (
    <div className={`flex w-full items-center gap-2 py-2 px-3 text-left`}>
      <CircleSkeleton size="sm" />
      <div className="flex flex-1 flex-col justify-center">
        <TextSkeleton size="lg" className="w-3/12" />
        <div className="flex items-baseline">
          <div className="flex-1">
            <TextSkeleton size="sm" className="w-7/12" />
          </div>
          <TextSkeleton size="sm" className="w-2/12" />
        </div>
      </div>
    </div>
  );
};

export default SidebarButtonSkeleton;
