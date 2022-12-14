import JobsList from "../components/Jobs/JobsList";
import Map from "../components/Jobs/Map";
import SearchBar from "../components/Jobs/SearchBar";
import { useQuery } from "react-query";
import { JobAPI } from "../api";
import useQueryParams from "../hooks/useQueryParams";
import { useState, useEffect } from "react";

const Shops = () => {
  //   const [searchParams] = useQueryParams();
  //   const { data: jobs, isLoading } = useQuery(
  //     searchParams?.q ? ["jobs", { search: searchParams.q }] : "jobs",
  //     () => JobAPI.getJobType("shop")
  //   );

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    ApiCall();
  }, []);
  const ApiCall = async () => {
    const data = await JobAPI.getJobType("shop");
    console.log(data);
    setJobs(data);
  };

  return (
    <>
      <SearchBar />

      <main className="grid flex-1 grid-cols-1 md:grid-cols-2">
        <div className="order-2 flex aspect-square items-center justify-center bg-gray-100 text-4xl text-gray-400 shadow-inner md:order-1 md:aspect-auto">
          <Map jobs={jobs} />
        </div>
        <div className="order-1 md:order-2">
          <JobsList jobs={jobs} isLoading={false} />
        </div>
      </main>
    </>
  );
};

export default Shops;
