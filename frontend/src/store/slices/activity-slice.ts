import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    deleting: false,
  },
  reducers: {
    setDeleting(state: {deleting:boolean}, action: PayloadAction<boolean>){
      state.deleting = action.payload;
    }
  },
});
export const activityActions = activitySlice.actions;

export default activitySlice;
