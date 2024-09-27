import { configureStore } from '@reduxjs/toolkit';
import recurrenceReducer from './recurrenceSlice';

const store = configureStore({
  reducer: {
    recurrence: recurrenceReducer,
  },
});

export default store;
