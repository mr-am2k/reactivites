import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity } from '../../models/activity';

type ActivityStore = {
  activities: Activity[];
  activitiesGroupedByDate: [string,Activity[]][]
  selectedActivity: Activity | undefined;
  editMode: boolean;
  loading: boolean;
  submitting: boolean;
  deleting: boolean;
};

const initialState: ActivityStore = {
  activities: [],
  activitiesGroupedByDate: [],
  selectedActivity: undefined,
  editMode: false,
  loading: true,
  submitting: false,
  deleting: false,
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setActivities(state: ActivityStore, action: PayloadAction<Activity[]>) {
      state.activities = action.payload.sort((a,b) => b.date!.getTime() - a.date!.getTime()); //sorting activities in descending order
    },
    setActivitiesGroupedByDate(state: ActivityStore, action: PayloadAction<[string, Activity[]][]>) {
      state.activitiesGroupedByDate = action.payload
    },
    setSelectedActivity(
      state: ActivityStore,
      action: PayloadAction<Activity | undefined>
    ) {
      state.selectedActivity = action.payload;
    },
    changeLoading(state: ActivityStore, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    changeSubmitting(state: ActivityStore, action: PayloadAction<boolean>) {
      state.submitting = action.payload;
    },
    changeDeleting(state: ActivityStore, action: PayloadAction<boolean>) {
      state.deleting = action.payload;
    },
  },
});

export const activityActions = activitySlice.actions;

export default activitySlice;
