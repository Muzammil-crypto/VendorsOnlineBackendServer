import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import useLoggedIn from '../../hooks/useLoggedIn';
import useNotifications from '../../hooks/useNotifications';
import Events from '../../utils/socketEvents';
import { Link, useLocation } from 'react-router-dom';
import { ChatAlt2Icon } from '@heroicons/react/outline';

const ChatButton = () => {
  const { socket, user } = useLoggedIn();
  const { pathname } = useLocation();
  const inChat = pathname.includes('/chats');
  const { newMessageChats, newMessageArrived } = useNotifications();

  const queryClient = useQueryClient();
  useEffect(() => {
    if (socket) {
      socket.on(Events.CHAT.MESSAGE, (newMessage) => {
        queryClient.setQueryData(['chat', newMessage.chat], (chat) => {
          if (!chat) {
            return {
              _id: newMessage.chat,
              users: [newMessage.sender, user],
              messages: [newMessage],
            };
          }

          chat.messages = chat.messages.concat(newMessage);
          return chat;
        });

        queryClient.setQueryData('chats', (chats) => {
          if (!chats) {
            return [
              {
                _id: newMessage.chat,
                users: [newMessage.sender, user],
                lastMessage: newMessage,
              },
            ];
          }

          chats.forEach((chat) => {
            if (chat._id === newMessage.chat) {
              chat.lastMessage = newMessage;
            }
          });
          return chats;
        });

        // query params from window.location
        const { search } = window.location;
        const params = new URLSearchParams(search);
        const chatId = params.get('c');
        if (chatId !== newMessage.chat) {
          newMessageArrived(newMessage.chat);
        }
      });

      return () => {
        socket.off(Events.CHAT.MESSAGE);
      };
    }
  }, [socket]);

  if (inChat) {
    return null;
  }

  return (
    <Link to="/chats" className="relative mr-4 flex items-center" title="Chat">
      <ChatAlt2Icon className="h-6 w-6 text-primary-500" />

      {!inChat && newMessageChats.length > 0 && (
        <span className="absolute top-0 right-0 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
        </span>
      )}
    </Link>
  );
};

export default ChatButton;
