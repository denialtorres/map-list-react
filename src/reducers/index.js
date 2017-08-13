import { combineReducers } from 'redux';
import search from './searchReducer';
import currentSelections from './currentSelectionsReducer';
import selectCard from './selectCardReducer';
export default combineReducers({
  search,
  currentSelections,
  selectCard
});
