import TextSkeleton from '../Utils/Skeleton/TextSkeleton';
import RectangleSkeleton from '../Utils/Skeleton/RectangleSkeleton';
import CircleSkeleton from '../Utils/Skeleton/CircleSkeleton';

const JobDetailsSkeleton = () => {
  return (
    <div className="w-full rounded bg-gray-100/70 px-6 py-10">
      {/* info section */}
      <div className="border-b-2 border-gray-200 pb-6 ">
        <TextSkeleton size="lg" className="w-1/2" />
        <TextSkeleton size="md" className="w-2/3" />

        <TextSkeleton size="md" className="mt-2.5 w-full" />

        <TextSkeleton size="md" className="mt-3 w-10/12" />
        <TextSkeleton size="md" className="w-12/12" />
        <TextSkeleton size="md" className="w-11/12" />
        <TextSkeleton size="md" className="w-5/12" />

        <TextSkeleton size="sm" className="mt-4 w-1/3" />

        <RectangleSkeleton className="mt-6 h-9 w-full" />
      </div>

      {/* profile section */}
      <div className="mt-6 flex items-center gap-2">
        <CircleSkeleton size="md" />
        <div className="flex flex-1 flex-col justify-center">
          {/* <h3 className="">{job.createdBy.name}</h3> */}
          <TextSkeleton size="lg" className="w-3/12" />

          <TextSkeleton size="md" className="w-6/12" />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSkeleton;
