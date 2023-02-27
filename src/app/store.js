import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import paymentsMadeReducer from '../features/paymentsMade/paymentsMadeSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    paymentsMade: paymentsMadeReducer,
  },
});
