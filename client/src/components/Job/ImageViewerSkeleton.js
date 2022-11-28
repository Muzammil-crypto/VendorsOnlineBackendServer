import RectangleSkeleton from '../Utils/Skeleton/RectangleSkeleton';

const ImageViewerSkeleton = () => {
  return (
    <div className="w-full">
      <RectangleSkeleton className="aspect-video w-full" />

      <div className="thin-scrollbar-x mt-2 flex snap-x snap-start gap-2 overflow-x-auto pb-2">
        {[...new Array(10)].map((_, index) => (
          <RectangleSkeleton
            key={index}
            className="aspect-video w-24 shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageViewerSkeleton;
