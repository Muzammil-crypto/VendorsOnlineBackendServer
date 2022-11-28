import firstCharacter from '../../utils/firstCharacter';
import dayjs from 'dayjs';
import useQueryParams from '../../hooks/useQueryParams';
import useNotifications from '../../hooks/useNotifications';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const SidebarButton = ({ chatId, other, lastMessage }) => {
  const [search, setSearch] = useQueryParams();
  const { newMessageChats, readChat } = useNotifications();
  const { width } = useWindowDimensions();

  const active = search.c === chatId;

  return (
    <button
      className={`relative flex w-full items-center justify-center gap-2 py-2 px-3 text-left transition focus:outline-none focus:ring-1 focus:ring-primary-200 ${
        active ? 'bg-primary-500/10 ' : ''
      }`}
      onClick={() => {
        setSearch({ c: chatId });
        readChat(chatId);
      }}
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-600">
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
      <div className=" flex flex-1 flex-col justify-center">
        <h3 className="text-sm">{other.name}</h3>
        <div className="flex items-baseline">
          <p className="flex-1 truncate text-xs text-gray-600">
            {lastMessage?.text?.length > 25
              ? lastMessage.text.substring(0, width < 1024 ? 10 : 25) + '...'
              : lastMessage.text}
          </p>
          <span className="text-xxs text-gray-500 ">
            {lastMessage?.createdAt
              ? dayjs(lastMessage.createdAt).diff(dayjs(), 'days') < 1
                ? dayjs(lastMessage.createdAt).format('hh:mm A')
                : dayjs(lastMessage.createdAt).fromNow()
              : null}
          </span>
        </div>
      </div>
      {newMessageChats.find((c) => c === chatId) && (
        <span className="absolute top-0 right-0 mt-2 mr-2 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
        </span>
      )}
    </button>
  );
};

export default SidebarButton;
