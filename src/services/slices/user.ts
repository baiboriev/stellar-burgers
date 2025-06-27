import { createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '../../utils/types';
import { USER_SLICE_NAME } from './slicesName';
import {
  getUserOrdersThunk,
  getUserThunk,
  loginUserThunk,
  logoutThunk,
  registerUserThunk,
  updateUserThunk
} from '../thunk/user';

export interface UserState {
  isAuthChecked: boolean;
  userData: TUser | null;
  userOrders: TOrder[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isAuthChecked: false,
  userData: null,
  userOrders: [],
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userData = payload;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userData = payload;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userData = payload.user;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = null;
      })
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userOrders = payload;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userData = payload;
      });
  },
  selectors: {
    getUserData: (state) => state.userData,
    getUserOrders: (state) => state.userOrders,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getIsLoading: (state) => state.isLoading
  }
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;
