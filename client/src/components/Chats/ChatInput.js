import { useState, useEffect } from 'react';
import AssignJob from './AssignJob';
import { useMutation, useQueryClient } from 'react-query';
import { ChatAPI } from '../../api';

const ChatInput = ({ chatId, other }) => {
  const [message, setMessage] = useState('');

  const queryClient = useQueryClient();
  const { mutate: sendMessage } = useMutation(ChatAPI.addTextMessage, {
    onSuccess: (newMessage) => {
      queryClient.setQueryData(['chat', chatId], (chat) => {
        chat.messages = chat.messages.concat(newMessage);
        return chat;
      });

      queryClient.setQueryData('chats', (chats) => {
        chats.forEach((chat) => {
          if (chat._id === chatId) {
            chat.lastMessage = newMessage;
          }
        });
        return chats;
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.trim()) {
      sendMessage({ id: chatId, text: message, receiverId: other._id });
      setMessage('');
    }
  };

  useEffect(() => {
    setMessage('');
  }, [chatId]);

  return (
    <form className="relative my-2 px-4 sm:px-10" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        className=" w-full rounded-lg border-2 border-gray-200 py-2 pl-4 pr-28 focus:border-primary-300 focus:ring-0"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="absolute right-0 top-1/2 mr-6 flex -translate-y-1/2 items-center gap-3 sm:mr-12">
        <AssignJob assignTo={other} chatId={chatId} />

        <button
          type="submit"
          className="rounded-lg bg-primary-500 py-1 px-3 font-medium text-white"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
