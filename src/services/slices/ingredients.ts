import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { INGREDIENTS_SLICE_NAME } from './slicesName';
import { getIngredientsThunk } from '../thunk/ingredients';

export interface ingredientsState {
  data: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ingredientsState = {
  data: [],
  buns: [],
  mains: [],
  sauces: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(getIngredientsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        state.buns = payload.filter((ingredient) => ingredient.type === 'bun');
        state.mains = payload.filter(
          (ingredient) => ingredient.type === 'main'
        );
        state.sauces = payload.filter(
          (ingredient) => ingredient.type === 'sauce'
        );
      });
  },
  selectors: {
    getIngredients: (state) => state.data,
    getBuns: (state) => state.buns,
    getMains: (state) => state.mains,
    getSauces: (state) => state.sauces,
    getIsLoading: (state) => state.isLoading
  }
});

export const ingredientsActions = ingredientsSlice.actions;
export const ingredientsSelectors = ingredientsSlice.selectors;
