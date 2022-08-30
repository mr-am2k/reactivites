import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ServerError} from '../../models/server-error'

type CommonStore = {
  error: ServerError | null;
};

const initialState: CommonStore = {
  error: null
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setServerError(state, action: PayloadAction<ServerError>){
        state.error = action.payload
    },
  },
});

export const CommonActions = commonSlice.actions;

export default commonSlice;
