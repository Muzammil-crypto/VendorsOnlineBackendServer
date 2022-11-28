import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

const useNotifications = () => {
  const { newMessageChats, newMessageArrived, readChat } =
    useContext(NotificationContext);

  return { newMessageChats, newMessageArrived, readChat };
};

export default useNotifications;
