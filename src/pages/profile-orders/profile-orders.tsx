import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { userSelectors } from '../../services/slices/user';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrdersThunk } from '../../services/thunk/user';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(userSelectors.getUserOrders);

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
