import { createSlice } from '@reduxjs/toolkit';

interface LoginType {
  loginState: boolean;
  id: string;
}
const initialState = {
  login: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;
