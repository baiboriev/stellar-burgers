import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../slices/slicesName';

export const getOrderByNumberThunk = createAsyncThunk(
  `${ORDER_SLICE_NAME}/getOrderByNumber`,
  async (number: number) => await getOrderByNumberApi(number)
);

export const sendOrderThunk = createAsyncThunk(
  `${ORDER_SLICE_NAME}/sendOrder`,
  async (data: string[]) => await orderBurgerApi(data)
);
