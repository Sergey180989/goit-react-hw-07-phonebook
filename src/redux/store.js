import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice } from '../../src/redux/slice';

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  },
});
