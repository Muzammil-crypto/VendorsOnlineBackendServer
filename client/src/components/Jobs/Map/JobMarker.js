import { Popover, Transition } from '@headlessui/react';
import currencyFormatter from '../../../utils/currencyFormatter';
import Rating from '../../Utils/Rating';
import { useNavigate } from 'react-router-dom';

const JobMarker = ({ job }) => {
  const navigate = useNavigate();

  return (
    <Popover className="relative">
      <Popover.Button>
        <div
          className={`flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-gray-100 ${
            job.status === 'assigned' ? 'bg-blue-500' : 'bg-primary-500'
          } `}
        />
      </Popover.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute z-10 -translate-x-1/2">
          <div className="min-w-max space-y-2 rounded-md bg-white px-6 py-3">
            <h4 className="text-base font-medium text-gray-900">{job.title}</h4>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
              <span>{currencyFormatter(job.budget)}</span>
              <div className="flex items-center gap-0.5 text-sm">
                <Rating reviews={job.createdBy.reviews || []} />
              </div>
            </div>
            <button
              className="rounded-md bg-primary-500 px-3 py-1 text-sm text-white"
              onClick={() => navigate(`/jobs/${job._id}`)}
            >
              View
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default JobMarker;
