import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedSelectors } from '../../services/slices/feed';
import { getFeedThunk } from '../../services/thunk/feed';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(feedSelectors.getFeedOrders);
  const feedIsLoading = useSelector(feedSelectors.getFeedIsLoading);

  const handleGetFeeds = () => {
    dispatch(getFeedThunk());
  };

  useEffect(() => {
    dispatch(getFeedThunk());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return feedIsLoading ? (
    <Preloader />
  ) : (
    <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
  );
};
