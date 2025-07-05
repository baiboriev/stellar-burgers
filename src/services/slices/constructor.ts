import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CONSTRUCTOR_SLICE_NAME } from './slicesName';
import { v4 as uuidv4 } from 'uuid';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { sendOrderThunk } from '../thunk/order';

export interface constructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: constructorState = {
  bun: null,
  ingredients: [],
  isLoading: false,
  error: null
};

export const constructorSlice = createSlice({
  name: CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;

        ingredient.type === 'bun'
          ? (state.bun = ingredient)
          : (state.ingredients = [...state.ingredients, ingredient]);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: uuidv4()
        }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      if (state.ingredients) {
        const { fromIndex, toIndex } = action.payload;
        const [item] = state.ingredients.splice(fromIndex, 1);
        state.ingredients.splice(toIndex, 0, item);
      }
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sendOrderThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.bun = null;
      state.ingredients = [];
    });
  },
  selectors: {
    getConstructor: (state) => state
  }
});

export const constructorActions = constructorSlice.actions;
export const constructorSelectors = constructorSlice.selectors;
