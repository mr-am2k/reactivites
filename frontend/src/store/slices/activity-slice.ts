import { createSlice } from '@reduxjs/toolkit';
const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    test: 'test',
  },
  reducers: {
    changeStatus(state:any, action:any) {
      state.test = action.payload;
    },
  },
});
export const activityActions = activitySlice.actions;

export default activitySlice;
