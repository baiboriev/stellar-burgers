import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { ORDER_SLICE_NAME } from './slicesName';
import { getOrderByNumberThunk, sendOrderThunk } from '../thunk/order';

export interface orderState {
  orderData: TOrder | null;
  orderModalData: TOrder | null;
  orderName: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: orderState = {
  orderData: null,
  orderModalData: null,
  orderName: null,
  isLoading: false,
  error: null
};

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderData = null;
      state.orderModalData = null;
      state.orderData = null;
      state.orderName = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderData = null;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orderData = payload.orders[0];
      })
      .addCase(sendOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderModalData = null;
      })
      .addCase(sendOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(sendOrderThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orderModalData = payload.order;
        state.orderName = payload.name;
      });
  },
  selectors: {
    getOrderByNumber: (state) => state.orderData
  }
});

export const orderActions = orderSlice.actions;
export const orderSelectors = orderSlice.selectors;
