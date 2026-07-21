import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import counterSlie from './slices/counterSlice.js' 


const store = configureStore({
  reducer: {
    auth: authReducer,
    counter:counterSlie
  },
});

export default store;
