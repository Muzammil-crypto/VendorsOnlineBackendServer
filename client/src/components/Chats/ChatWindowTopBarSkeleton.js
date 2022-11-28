import TextSkeleton from '../Utils/Skeleton/TextSkeleton';
import CircleSkeleton from '../Utils/Skeleton/CircleSkeleton';

const ChatWindowTopBarSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-4 bg-primary-100 p-2">
      <CircleSkeleton size="sm" />

      <TextSkeleton size="lg" className="w-1/12" />
    </div>
  );
};

export default ChatWindowTopBarSkeleton;
