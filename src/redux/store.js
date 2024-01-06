import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './slice';
import { filterReducer } from './slice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
