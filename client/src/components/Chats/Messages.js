import { useRef, useEffect } from 'react';
import Message from './Message';
import MessageSkeleton from './MessageSkeleton';
import useLoggedIn from '../../hooks/useLoggedIn';

const Messages = ({ chat, isLoading }) => {
  const { user } = useLoggedIn();

  const other = chat?.users?.find((u) => u._id !== user?._id);

  const messageContainerRef = useRef();
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [messagesEndRef.current]);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [chat?.messages, messagesEndRef.current]);

  return (
    <div className="thin-scrollbar-y mt-2 h-[60vh] overflow-auto py-6 px-4 sm:px-10">
      <div ref={messageContainerRef} className="flex flex-col justify-end">
        {isLoading
          ? [...new Array(10)].map((_, i) => (
              <MessageSkeleton
                key={i}
                self={i % 2 === Math.floor(Math.random() * 2)}
              />
            ))
          : chat.messages?.map((message, index) => (
              <Message
                message={message}
                key={index}
                self={message.sender._id === user?._id}
                other={other}
                ref={index === chat.messages.length - 1 ? messagesEndRef : null}
              />
            ))}
      </div>
    </div>
  );
};

export default Messages;
