import { createContext, useState } from 'react';

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [newMessageChats, setNewMessageChats] = useState([]);

  const newMessageArrived = (chatId) => {
    setNewMessageChats((chats) => {
      const newChats = chats.concat(chatId);
      return newChats;
    });
  };

  const readChat = (chatId) => {
    setNewMessageChats((chats) => {
      const newChats = chats.filter((chat) => chat !== chatId);
      return newChats;
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        newMessageChats,
        newMessageArrived,
        readChat,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
export default NotificationProvider;
