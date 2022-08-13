import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import activitySlice from './slices/activity-slice';

const store = configureStore({
    reducer: {
        activities: activitySlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store;