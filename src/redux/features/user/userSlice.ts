import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { UserInfoState } from '../../state/userState';
import { fetchUserInfo } from './userTrunks';
import { Constants } from '../../../utils/constants';

const initialState: UserInfoState = {
  data: null,
  success: false,
  isLoading: false,
  apiError: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserInfo: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.apiError = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.apiError = null;
        state.data = action.payload.data;
        console.log('user_info fulfilled: ', action.payload);
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.apiError = (action.payload as string) || action.error.message || Constants.error;
        console.log('user_info reject: ', state.apiError);
      });
  }
});

export const { clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
