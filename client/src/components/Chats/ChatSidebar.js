import { useEffect } from 'react';
import SidebarButton from './SidebarButton';
import SidebarButtonSkeleton from './SidebarButtonSkeleton';
import useLoggedIn from '../../hooks/useLoggedIn';
import { useQuery } from 'react-query';
import { ChatAPI } from '../../api';
import useQueryParams from '../../hooks/useQueryParams';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

const ChatSidebar = () => {
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
    <aside className="h-full bg-gray-100">
      <div className="mb-2 flex h-14 w-full items-center bg-primary-500 py-2 px-4 text-lg font-bold text-white">
        <span className="hidden sm:block">Chats</span>
      </div>

      <div className="thin-scrollbar-y h-[70vh] overflow-y-auto">
        {isLoading
          ? [...new Array(5)].map((_, i) => <SidebarButtonSkeleton key={i} />)
          : chats
              ?.sort(
                (a, b) =>
                  dayjs(b.lastMessage.createdAt).valueOf() -
                  dayjs(a.lastMessage.createdAt).valueOf()
              )
              .map((chat) => {
                return (
                  <SidebarButton
                    chatId={chat._id}
                    other={chat.users.find((u) => u._id !== user?._id)}
                    lastMessage={chat.lastMessage || {}}
                    key={chat._id}
                  />
                );
              })}
      </div>
    </aside>
  );
};

export default ChatSidebar;
