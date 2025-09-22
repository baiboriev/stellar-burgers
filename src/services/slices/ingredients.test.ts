import { ingredientsSlice, ingredientsState } from './ingredients';
import { getIngredientsThunk } from '../thunk/ingredients';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  const initialState = ingredientsSlice.getInitialState();
  const rejectedState = {
    ...initialState,
    isLoading: false,
    error: 'test'
  };
  const errorMessage = 'Тестовая ошибка';
  const pendingState = {
    ...initialState,
    isLoading: true
  };

  describe('getIngredientsThunk', () => {
    it('pending', () => {
      const state = ingredientsSlice.reducer(rejectedState, {
        type: getIngredientsThunk.pending.type
      });

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.data).toEqual(rejectedState.data);
      expect(state.buns).toEqual(rejectedState.buns);
      expect(state.mains).toEqual(rejectedState.mains);
      expect(state.sauces).toEqual(rejectedState.sauces);
    });

    describe('rejected', () => {
      it('action.error.message не пустой', () => {
        const state = ingredientsSlice.reducer(pendingState, {
          type: getIngredientsThunk.rejected.type,
          error: { message: 'Тестовая ошибка' }
        });

        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(errorMessage);
        expect(state.data).toEqual(pendingState.data);
        expect(state.buns).toEqual(pendingState.buns);
        expect(state.mains).toEqual(pendingState.mains);
        expect(state.sauces).toEqual(pendingState.sauces);
      });

      it('action.error.message пустой', () => {
        const state = ingredientsSlice.reducer(pendingState, {
          type: getIngredientsThunk.rejected.type,
          error: {}
        });

        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Произошла ошибка');
        expect(state.data).toEqual(pendingState.data);
        expect(state.buns).toEqual(pendingState.buns);
        expect(state.mains).toEqual(pendingState.mains);
        expect(state.sauces).toEqual(pendingState.sauces);
      });
    });

    describe('fulfilled', () => {
      const mockIngredients: TIngredient[] = [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa0942',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png'
        }
      ];

      it('payload', () => {
        const state = ingredientsSlice.reducer(pendingState, {
          type: getIngredientsThunk.fulfilled.type,
          payload: mockIngredients
        });

        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
        expect(state.data).toEqual(mockIngredients);

        expect(state.buns.every((ing) => ing.type === 'bun')).toBe(true);
        expect(state.mains.every((ing) => ing.type === 'main')).toBe(true);
        expect(state.sauces.every((ing) => ing.type === 'sauce')).toBe(true);

        expect(state.mains).toHaveLength(1);
        expect(state.buns).toHaveLength(2);
        expect(state.sauces).toHaveLength(1);
      });

      it('no payload', () => {
        const state = ingredientsSlice.reducer(pendingState, {
          type: getIngredientsThunk.fulfilled.type,
          payload: []
        });

        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
        expect(state.data).toEqual(pendingState.data);
        expect(state.buns).toEqual(pendingState.buns);
        expect(state.mains).toEqual(pendingState.mains);
        expect(state.sauces).toEqual(pendingState.sauces);
      });
    });
  });
  describe('selectors', () => {
    const mockState: ingredientsState = {
      data: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        }
      ],
      buns: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        }
      ],
      mains: [
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        }
      ],
      sauces: [],
      isLoading: false,
      error: null
    };

    it('getIngredients', () => {
      const result = ingredientsSlice.selectors.getIngredients({
        ingredients: mockState
      });
      expect(result).toEqual(mockState.data);
    });

    it('getBuns', () => {
      const result = ingredientsSlice.selectors.getBuns({
        ingredients: mockState
      });
      expect(result).toEqual(mockState.buns);
      expect(result.every((ing) => ing.type === 'bun')).toBe(true);
    });

    it('getMains', () => {
      const result = ingredientsSlice.selectors.getMains({
        ingredients: mockState
      });
      expect(result).toEqual(mockState.mains);
      expect(result.every((ing) => ing.type === 'main')).toBe(true);
    });

    it('getSauces', () => {
      const result = ingredientsSlice.selectors.getSauces({
        ingredients: mockState
      });
      expect(result).toEqual(mockState.sauces);
      expect(result.every((ing) => ing.type === 'sauce')).toBe(true);
    });

    it('getIsLoading', () => {
      const result = ingredientsSlice.selectors.getIsLoading({
        ingredients: mockState
      });
      expect(result).toBe(false);
    });
  });
});
