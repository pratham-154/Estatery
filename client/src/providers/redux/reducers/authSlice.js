import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
  },
  reducers: {
    setAuthUserData(state, action) {
      state.data = action.payload;
    },
    removeAuthUserData(state){
      state.data = null;
    }
  },
});

export const { setAuthUserData, removeAuthUserData } = authSlice.actions;

export default authSlice.reducer;