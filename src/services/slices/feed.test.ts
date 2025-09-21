import { feedSlice, feedState } from './feed';
import { getFeedThunk } from '../thunk/feed';
import { TOrder } from '@utils-types';

describe('feedSlice', () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  const initialState = feedSlice.getInitialState();
  const pendingState = {
    ...initialState,
    isLoading: true
  };
  const errorMessage = 'Тестовая ошибка';
  const rejectedState = {
    ...initialState,
    isLoading: false,
    error: 'Тестовая ошибка'
  };

  describe('getFeedThunk', () => {
    it('pending', () => {
      const state = feedSlice.reducer(rejectedState, {
        type: getFeedThunk.pending.type
      });

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();

      expect(state.orders).toEqual(rejectedState.orders);
      expect(state.total).toBe(rejectedState.total);
      expect(state.totalToday).toBe(rejectedState.totalToday);
      expect(state.pendingOrders).toBe(rejectedState.pendingOrders);
      expect(state.readyOrders).toBe(rejectedState.readyOrders);
    });

    describe('rejected', () => {
      it('action.error.message не пустой', () => {
        const state = feedSlice.reducer(pendingState, {
          type: getFeedThunk.rejected.type,
          error: { message: errorMessage }
        });

        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(errorMessage);

        expect(state.orders).toEqual(pendingState.orders);
        expect(state.total).toBe(pendingState.total);
        expect(state.totalToday).toBe(pendingState.totalToday);
        expect(state.pendingOrders).toBe(pendingState.pendingOrders);
        expect(state.readyOrders).toBe(pendingState.readyOrders);
      });

      it('action.error.message пустой', () => {
        const state = feedSlice.reducer(pendingState, {
          type: getFeedThunk.rejected.type,
          error: {}
        });

        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Произошла ошибка');

        expect(state.orders).toEqual(pendingState.orders);
        expect(state.total).toBe(pendingState.total);
        expect(state.totalToday).toBe(pendingState.totalToday);
        expect(state.pendingOrders).toBe(pendingState.pendingOrders);
        expect(state.readyOrders).toBe(pendingState.readyOrders);
      });
    });

    describe('fulfilled', () => {
      const mockOrders: TOrder[] = [
        {
          _id: '68cfe3a3673086001ba89155',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный spicy бургер',
          createdAt: '2025-09-21T11:38:11.245Z',
          updatedAt: '2025-09-21T11:38:12.326Z',
          number: 89128
        },
        {
          _id: '68cfe381673086001ba89154',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный spicy бургер',
          createdAt: '2025-09-21T11:37:37.588Z',
          updatedAt: '2025-09-21T11:37:38.806Z',
          number: 89127
        },
        {
          _id: '68cfe064673086001ba89144',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa0947',
            '643d69a5c3f7b9001cfa0947',
            '643d69a5c3f7b9001cfa0949',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Фалленианский краторный бессмертный минеральный экзо-плантаго био-марсианский бургер',
          createdAt: '2025-09-21T11:24:20.804Z',
          updatedAt: '2025-09-21T11:24:22.119Z',
          number: 89126
        },
        {
          _id: '68cfe016673086001ba89141',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'pending',
          name: 'Флюоресцентный люминесцентный метеоритный бургер',
          createdAt: '2025-09-21T11:23:02.267Z',
          updatedAt: '2025-09-21T11:23:03.515Z',
          number: 89125
        },
        {
          _id: '68cfde0e673086001ba8913d',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa0947',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'pending',
          name: 'Флюоресцентный фалленианский люминесцентный метеоритный бургер',
          createdAt: '2025-09-21T11:14:22.484Z',
          updatedAt: '2025-09-21T11:14:23.696Z',
          number: 89124
        }
      ];

      const mockPayload = {
        orders: mockOrders,
        total: 123,
        totalToday: 12
      };

      it('payload', () => {
        const oldState = {
          ...pendingState,
          orders: [
            {
              _id: '68cfe3a3673086001ba89155',
              ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa093d'
              ],
              status: 'done',
              name: 'Space флюоресцентный spicy бургер',
              createdAt: '2025-09-21T11:38:11.245Z',
              updatedAt: '2025-09-21T11:38:12.326Z',
              number: 89128
            }
          ],
          readyOrders: [
            {
              _id: '68cfe3a3673086001ba89155',
              ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa093d'
              ],
              status: 'done',
              name: 'Space флюоресцентный spicy бургер',
              createdAt: '2025-09-21T11:38:11.245Z',
              updatedAt: '2025-09-21T11:38:12.326Z',
              number: 89128
            }
          ]
        };

        const state = feedSlice.reducer(oldState, {
          type: getFeedThunk.fulfilled.type,
          payload: mockPayload
        });

        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();

        expect(state.orders).toEqual(mockOrders);
        expect(state.total).toBe(123);
        expect(state.totalToday).toBe(12);

        expect(state.readyOrders).toHaveLength(3);
        expect(
          state.readyOrders.every((order) => order.status === 'done')
        ).toBe(true);

        expect(state.pendingOrders).toHaveLength(2);
        expect(
          state.pendingOrders.every((order) => order.status === 'pending')
        ).toBe(true);
      });

      it('empty payload', () => {
        const emptyPayload = {
          orders: [],
          total: 0,
          totalToday: 0
        };

        const state = feedSlice.reducer(initialState, {
          type: getFeedThunk.fulfilled.type,
          payload: emptyPayload
        });
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();

        expect(state.orders).toEqual([]);
        expect(state.readyOrders).toEqual([]);
        expect(state.pendingOrders).toEqual([]);
        expect(state.total).toBe(0);
        expect(state.totalToday).toBe(0);
      });
    });
  });

  describe('selectors', () => {
    const mockState: feedState = {
      orders: [
        {
          _id: '68cfe3a3673086001ba89155',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный spicy бургер',
          createdAt: '2025-09-21T11:38:11.245Z',
          updatedAt: '2025-09-21T11:38:12.326Z',
          number: 89128
        }
      ],
      pendingOrders: [],
      readyOrders: [
        {
          _id: '68cfe3a3673086001ba89155',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный spicy бургер',
          createdAt: '2025-09-21T11:38:11.245Z',
          updatedAt: '2025-09-21T11:38:12.326Z',
          number: 89128
        }
      ],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: 'Тестовая ошибка'
    };

    it('getFeed', () => {
      const result = feedSlice.selectors.getFeed({
        feed: mockState
      });
      expect(result).toEqual(mockState);
    });

    it('getFeedOrders', () => {
      const result = feedSlice.selectors.getFeedOrders({
        feed: mockState
      });
      expect(result).toEqual(mockState.orders);
    });

    it('getFeedIsLoading', () => {
      const result = feedSlice.selectors.getFeedIsLoading({
        feed: mockState
      });
      expect(result).toEqual(mockState.isLoading);
    });
  });
});
