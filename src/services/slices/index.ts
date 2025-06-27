import { combineReducers } from 'redux';
import { userSlice } from './user';
import { ingredientsSlice } from './ingredients';
import { feedSlice } from './feed';
import { orderSlice } from './order';
import { constructorSlice } from './constructor';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [orderSlice.name]: orderSlice.reducer
});
export default rootReducer;
