import { createSlice } from '@reduxjs/toolkit';

interface UserInfo {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface UserState {
  userInfo: UserInfo | null;
}

const initialState: UserState = {
  userInfo: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const data = action.payload;
      state.userInfo = {
        id: data.id,
        name: data.username,
        email: data.email,
        token: data.token,
      };
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
