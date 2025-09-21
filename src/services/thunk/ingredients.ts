import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { INGREDIENTS_SLICE_NAME } from '../slices/slicesName';

export const getIngredientsThunk = createAsyncThunk(
  `${INGREDIENTS_SLICE_NAME}/getIngredients`,
  async () => await getIngredientsApi()
);
