import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem('token'); // ✅ only available per session
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;