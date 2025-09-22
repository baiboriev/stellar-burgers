import {
  TLoginData,
  loginUserApi,
  getUserApi,
  TRegisterData,
  registerUserApi,
  logoutApi,
  getOrdersApi,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../slices/slicesName';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const loginUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const getUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  async () => await getUserApi()
);

export const logoutThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/logout`,
  async () => {
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

export const getUserOrdersThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/getUserOrders`,
  async () => await getOrdersApi()
);

export const updateUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (user: Partial<TRegisterData>) => (await updateUserApi(user)).user
);
