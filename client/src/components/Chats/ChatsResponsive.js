import { Menu, Transition } from '@headlessui/react';
import { ChatAlt2Icon } from '@heroicons/react/outline';
import SidebarButton from './SidebarButton';
import dayjs from 'dayjs';

import { useEffect } from 'react';
import SidebarButtonSkeleton from './SidebarButtonSkeleton';
import useLoggedIn from '../../hooks/useLoggedIn';
import { useQuery } from 'react-query';
import { ChatAPI } from '../../api';
import useQueryParams from '../../hooks/useQueryParams';
import { useLocation } from 'react-router-dom';

const ChatsResponsive = () => {
  const { user } = useLoggedIn();
  const [search, setSearch] = useQueryParams();
  const { state } = useLocation();

  const { data: chats, isLoading } = useQuery('chats', ChatAPI.getChats);

  useEffect(() => {
    if (state?.cu) {
      const chat = chats?.find((chat) =>
        chat.users.some((user) => user._id === state.cu)
      );

      if (chat) {
        setSearch({ c: chat._id });
      }
    }
  }, []);

  return (
    <Menu
      as="div"
      className="relative flex items-center justify-end md:hidden "
    >
      <Menu.Button>
        <ChatAlt2Icon className="h-6 w-6 text-white" />
      </Menu.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 z-30 mt-8 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-80">
          <div className="thin-scrollbar-y h-[40vh] overflow-y-auto">
            {isLoading
              ? [...new Array(5)].map((_, i) => (
                  <SidebarButtonSkeleton key={i} />
                ))
              : chats
                  ?.sort(
                    (a, b) =>
                      dayjs(b.lastMessage.createdAt).valueOf() -
                      dayjs(a.lastMessage.createdAt).valueOf()
                  )
                  .map((chat) => {
                    return (
                      <Menu.Item>
                        <SidebarButton
                          chatId={chat._id}
                          other={chat.users.find((u) => u._id !== user?._id)}
                          lastMessage={chat.lastMessage || {}}
                          key={chat._id}
                        />
                      </Menu.Item>
                    );
                  })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ChatsResponsive;
