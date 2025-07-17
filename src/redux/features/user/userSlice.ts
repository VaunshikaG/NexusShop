import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfoState } from '../../state/userState';
import { fetchUserInfo } from './userTrunks';
import { Constants } from '../../../utils/constants';

const initialState: UserInfoState = {
  statusCode: null,
  data: null,
  success: false,
  isLoading: false,
  apiError: null,
  message: null,
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
        state.message = null;
        state.statusCode = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.apiError = null;
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
        state.data = action.payload.data.data;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.apiError = (action.payload as string) || action.error.message || Constants.error;
      });
  }
});

export const { clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
