import firstCharacter from '../../utils/firstCharacter';
import useLoggedIn from '../../hooks/useLoggedIn';
import Messages from './Messages';
import ChatInput from './ChatInput';
import { useQuery } from 'react-query';
import { ChatAPI } from '../../api';
import useQueryParams from '../../hooks/useQueryParams';
import ChatWindowTopBarSkeleton from './ChatWindowTopBarSkeleton';
import ChatsResponsive from './ChatsResponsive';
import ChatMenu from './ChatMenu';

const ChatWindow = () => {
  const { user } = useLoggedIn();
  const [search] = useQueryParams();
  const chatId = search.c;

  const { data: chat, isLoading } = useQuery(['chat', chatId], () =>
    chatId ? ChatAPI.getChat(chatId) : {}
  );

  const other = chat?.users?.find((u) => u._id !== user?._id);

  return (
    <div className="h-full bg-gray-50">
      <div className="flex h-14 w-full items-center justify-between gap-4 bg-primary-400 px-4 py-2">
        <div className="flex items-center gap-4">
          {other && (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-600">
                {other.profileImage ? (
                  <img
                    src={other.profileImage}
                    alt="profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  firstCharacter(other.name)
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-50">{other.name}</h3>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ChatsResponsive />

          {chat?._id && <ChatMenu activeChat={chat} />}
        </div>
      </div>
      {chatId && (
        <>
          <Messages chat={chat} isLoading={isLoading} />
          <ChatInput chatId={chat?._id} other={other} />
        </>
      )}
    </div>
  );
};

export default ChatWindow;
