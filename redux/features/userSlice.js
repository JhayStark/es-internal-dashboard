import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    value: {},
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.value = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.value = {};
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = state => state.user.value;

export default userSlice.reducer;
