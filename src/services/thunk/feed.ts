import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from '../slices/slicesName';

export const getFeedThunk = createAsyncThunk(
  `${FEED_SLICE_NAME}/getFeeds`,
  async () => await getFeedsApi()
);
