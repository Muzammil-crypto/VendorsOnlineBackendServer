import { BriefcaseIcon } from '@heroicons/react/outline';
import { useQuery } from 'react-query';
import { JobAPI } from '../../../api';
import useLoggedIn from '../../../hooks/useLoggedIn';
import AssignJobCard from './AssignJobCard';
import AssignJobCardSkeleton from './AssignJobCardSkeleton';
import { Popover, Transition } from '@headlessui/react';

const AssignJob = ({ assignTo, chatId }) => {
  const { user } = useLoggedIn();
  const { data: jobs, isLoading } = useQuery('ownActiveJobs', () =>
    JobAPI.getJobs({ createdBy: user._id, status: 'active,cancelled' })
  );

  return (
    <Popover className="relative flex items-center">
      <Popover.Button className="text-gray-700">
        <BriefcaseIcon className="h-5 w-5" />
      </Popover.Button>

      <Transition
        enter="transition duration-100 origin-bottom ease-out"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition duration-75 origin-bottom ease-out"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0"
      >
        <Popover.Panel className="thin-scrollbar-x absolute bottom-0 -right-10 mb-10 max-w-md snap-x snap-start overflow-x-auto bg-white p-2 shadow md:max-w-xl">
          {({ close }) => (
            <div className="flex divide-x">
              {isLoading ? (
                [...new Array(4)].map((_, i) => (
                  <AssignJobCardSkeleton key={i} />
                ))
              ) : jobs.length > 0 ? (
                jobs?.map((job) => (
                  <AssignJobCard
                    job={job}
                    assignTo={assignTo}
                    chatId={chatId}
                    key={job._id}
                    onClose={close}
                  />
                ))
              ) : (
                <div className="flex min-w-max flex-col items-center justify-center">
                  <p className="text-center text-gray-500">No jobs available</p>
                </div>
              )}
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default AssignJob;
