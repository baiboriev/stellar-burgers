import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { userSelectors } from '../../services/slices/user';
import { Preloader } from '@ui';
import { getCookie } from '../../utils/cookie';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
  const user = useSelector(userSelectors.getUserData);
  const isAuthChecked = useSelector(userSelectors.getIsAuthChecked);
  const location = useLocation();
  const token = getCookie('accessToken');

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user && !token) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
}

export default ProtectedRoute;
