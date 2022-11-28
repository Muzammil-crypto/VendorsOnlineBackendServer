import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import useQueryParams from '../../hooks/useQueryParams';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useQueryParams();
  const [query, setQuery] = useState(searchParams.q || '');

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams({ ...searchParams, q: query });
  }

  return (
    <div className="w-full border-b-2 border-gray-400 p-4 shadow-md shadow-gray-400/10">
      <div className="mx-auto flex items-center gap-6 px-4 sm:px-10 md:max-w-xl lg:max-w-4xl">
        <form className="relative z-0 flex-1" onSubmit={handleSubmit}>
          <input
            type="text"
            className="z-0 w-full rounded-lg border-gray-400/80 py-2 pl-4 pr-16 text-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="absolute top-1/2 right-0 mr-3 -translate-y-1/2 focus:border-none">
            <SearchIcon className=" h-6 w-6 text-primary-500" />
          </button>
        </form>
        <button
          className="hidden rounded-md bg-primary-500 px-8 py-1 text-lg text-white transition hover:bg-primary-600 md:block"
          onClick={handleSubmit}
        >
          Search
        </button>
        {/* <button className="rounded-md bg-primary-500 px-8 py-1 text-lg text-white transition hover:bg-primary-600">
          Price
        </button> */}
      </div>
    </div>
  );
};

export default SearchBar;
