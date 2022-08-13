import { configureStore } from '@reduxjs/toolkit';
import activitySlice from './slices/activity-slice';

const store = configureStore({
    reducer: {
        activities: activitySlice.reducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>