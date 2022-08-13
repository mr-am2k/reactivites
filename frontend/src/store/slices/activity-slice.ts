import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity } from '../../models/activity';

type ActivityStore = {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  deleting: boolean;
};

const initialState: ActivityStore = {
  activities: [],
  selectedActivity: undefined,
  deleting: false,
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setActivities(state: ActivityStore, action: PayloadAction<Activity[]>) {
      state.activities = action.payload;
    },
    setSelectedActivity(
      state: ActivityStore,
      action: PayloadAction<Activity | undefined>
    ) {
      state.selectedActivity = action.payload;
    },
    cancelSelectedActivity(state: ActivityStore) {
      state.selectedActivity = undefined;
    },
    setDeleting(state: ActivityStore, action: PayloadAction<boolean>) {
      state.deleting = action.payload;
    },
  },
});
export const activityActions = activitySlice.actions;

export default activitySlice;
