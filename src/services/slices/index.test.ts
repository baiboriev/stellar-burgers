import rootReducer from './index';
import { userSlice } from './user';
import { ingredientsSlice } from './ingredients';
import { feedSlice } from './feed';
import { orderSlice } from './order';
import { constructorSlice } from './constructor';

describe('rootReducer', () => {
  it('Правильная инициализация rootReducer', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toHaveProperty(userSlice.name);
    expect(initialState).toHaveProperty(ingredientsSlice.name);
    expect(initialState).toHaveProperty(feedSlice.name);
    expect(initialState).toHaveProperty(constructorSlice.name);
    expect(initialState).toHaveProperty(orderSlice.name);
  });
});
