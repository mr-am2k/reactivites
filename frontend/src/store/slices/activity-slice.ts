import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity } from '../../models/activity';

type ActivityStore = {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  editMode: boolean;
  loading: boolean;
  submitting: boolean;
  deleting: boolean;
};

const initialState: ActivityStore = {
  activities: [],
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
      state.activities = action.payload.sort((a,b) => Date.parse(b.date) - Date.parse(a.date)); //sorting activities in ascending order
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
    changeEditMode(state: ActivityStore, action: PayloadAction<boolean>) {
      state.editMode = action.payload;
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
