import JobsList from '../components/Jobs/JobsList';
import Map from '../components/Jobs/Map';
import SearchBar from '../components/Jobs/SearchBar';
import { useQuery } from 'react-query';
import { JobAPI } from '../api';
import useQueryParams from '../hooks/useQueryParams';

const Jobs = () => {
  const [searchParams] = useQueryParams();
  const { data: jobs, isLoading } = useQuery(
    searchParams?.q ? ['jobs', { search: searchParams.q }] : 'jobs',
    () =>
      JobAPI.getJobs({
        search: searchParams.q,
        status: 'active,cancelled,assigned',
      })
  );

  return (
    <>
      <SearchBar />

      <main className="grid flex-1 grid-cols-1 md:grid-cols-2">
        <div className="order-2 flex aspect-square items-center justify-center bg-gray-100 text-4xl text-gray-400 shadow-inner md:order-1 md:aspect-auto">
          <Map jobs={jobs} />
        </div>
        <div className="order-1 md:order-2">
          <JobsList jobs={jobs} isLoading={isLoading} />
        </div>
      </main>
    </>
  );
};

export default Jobs;
