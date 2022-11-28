import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { useMutation } from 'react-query';
import { UserAPI } from '../../api';
import useLoggedIn from '../../hooks/useLoggedIn';

const ChatMenu = ({ activeChat }) => {
  const { mutate: reportUser, isLoading } = useMutation(UserAPI.reportUser);
  const { user } = useLoggedIn();
  const other = activeChat?.users?.find((u) => u._id !== user?._id);

  return (
    <Menu as="div" className="relative flex items-center justify-end ">
      <Menu.Button>
        <DotsVerticalIcon className="h-6 w-6 text-white" />
      </Menu.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 z-30 mt-8 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-64">
          <Menu.Item>
            <button
              className="w-full p-2 hover:bg-primary-500/10"
              disabled={isLoading}
              onClick={() =>
                reportUser({
                  reportedTo: other._id,
                })
              }
            >
              Report User
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ChatMenu;
