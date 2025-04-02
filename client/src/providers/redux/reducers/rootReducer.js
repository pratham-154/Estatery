// store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
// import cartSlice from './cartSlice';

const rootReducer = combineReducers({
  auth: authSlice,
//   cart: cartSlice,
});

export default rootReducer;