import useLoggedIn from '../hooks/useLoggedIn';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component }) => {
  const { isLoggedIn } = useLoggedIn();

  if (isLoggedIn) {
    return component;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
