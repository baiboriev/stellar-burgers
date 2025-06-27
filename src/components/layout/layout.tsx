import { AppHeader } from '@components';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { userActions } from '../../services/slices/user';
import { useDispatch } from '../../services/store';
import { getIngredientsThunk } from '../../services/thunk/ingredients';
import { getUserThunk } from '../../services/thunk/user';
import { getCookie } from '../../utils/cookie';

export const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsThunk());
    const token = getCookie('accessToken');
    if (token) dispatch(getUserThunk());
    dispatch(userActions.authCheck());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};
