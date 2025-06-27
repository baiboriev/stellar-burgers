import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { FEED_SLICE_NAME } from './slicesName';
import { getFeedThunk } from '../thunk/feed';

export interface feedState {
  orders: TOrder[];
  pendingOrders: TOrder[];
  readyOrders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: feedState = {
  orders: [],
  pendingOrders: [],
  readyOrders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || 'Произошла ошибка';
      })
      .addCase(getFeedThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orders = payload.orders;
        state.readyOrders = payload.orders.filter(
          (order) => order.status === 'done'
        );
        state.pendingOrders = payload.orders.filter(
          (order) => order.status === 'pending'
        );
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      });
  },
  selectors: {
    getFeed: (state) => state,
    getFeedOrders: (state) => state.orders,
    getFeedIsLoading: (state) => state.isLoading
  }
});

export const feedActions = feedSlice.actions;
export const feedSelectors = feedSlice.selectors;
