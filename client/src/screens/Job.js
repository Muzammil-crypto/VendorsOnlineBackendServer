import ImageViewer from '../components/Job/ImageViewer';
import ImageViewerSkeleton from '../components/Job/ImageViewerSkeleton';
import JobDetails from '../components/Job/JobDetails';
import JobDetailsSkeleton from '../components/Job/JobDetailsSkeleton';
import useActivePage from '../hooks/useActivePage';
import { useQuery } from 'react-query';
import { JobAPI } from '../api';

const Job = () => {
  const { subPage } = useActivePage();

  const { data: job, isLoading } = useQuery(['job', subPage], () =>
    JobAPI.getJob(subPage)
  );

  return (
    <main className="mx-auto grid w-full max-w-4xl flex-1 grid-cols-1 gap-4 px-4 py-10 md:grid-cols-12 lg:max-w-5xl xl:max-w-6xl">
      <div className="md:col-span-7 lg:col-span-8">
        {isLoading ? (
          <ImageViewerSkeleton />
        ) : (
          <ImageViewer images={job.images || []} />
        )}
      </div>

      <div className="md:col-span-5 lg:col-span-4">
        {isLoading ? <JobDetailsSkeleton /> : <JobDetails job={job} />}
      </div>
    </main>
  );
};

export default Job;
