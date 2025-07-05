import { FC } from 'react';

import styles from './profile-orders.module.css';

import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';
import { useSelector } from '../../../../services/store';
import { userSelectors } from '../../../../services/slices/user';
import { Preloader } from '../../preloader';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => {
  const isLoading = useSelector(userSelectors.getIsLoading);

  return (
    <main className={`${styles.main}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <div className={`mt-10 ${styles.orders}`}>
        {isLoading ? <Preloader /> : <OrdersList orders={orders} />}
      </div>
    </main>
  );
};
