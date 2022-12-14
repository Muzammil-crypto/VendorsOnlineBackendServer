import JobCard from "./JobCard";
import SkeletonCard from "./SkeletonCard";
// import jobs from './jobs';
import LoaderIcon from "../../assets/icons/LoaderIcon";

const JobsList = ({ jobs, isLoading }) => {
  return (
    <div className="py-6 sm:px-4">
      <div className="flex gap-3 px-4 text-center">
        <h1 className="text-xl font-medium md:text-2xl">Available Results</h1>
        {isLoading ? (
          <div className="flex items-center justify-center px-2 text-green-500">
            <LoaderIcon />
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-xl bg-primary-500 px-2 text-xs text-white md:text-sm">
            {jobs?.length} available
          </div>
        )}
      </div>

      <div className="thin-scrollbar-y mt-4 grid h-[80vh] grid-cols-1 items-start gap-x-4 gap-y-6 overflow-auto px-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {isLoading
          ? [...new Array(4)]?.map((_, index) => <SkeletonCard key={index} />)
          : jobs?.map((job) => <JobCard job={job} key={job._id} />)}
      </div>
    </div>
  );
};

export default JobsList;
