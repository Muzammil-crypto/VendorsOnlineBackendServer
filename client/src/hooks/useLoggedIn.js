import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';

const useLoggedIn = () => {
  const { isLoginLoading, login, isLoggedIn, logout, recheck, user, socket } =
    useContext(LoginContext);

  return { isLoginLoading, login, isLoggedIn, logout, recheck, user, socket };
};

export default useLoggedIn;
