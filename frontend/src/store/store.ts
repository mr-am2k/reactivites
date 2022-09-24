import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import activitySlice from './slices/activity-slice';
import commonSlice from './slices/common-slice';

const store = configureStore({
  reducer: {
    activities: activitySlice.reducer,
    common: commonSlice.reducer,
  },
  middleware: getDefaultMiddleware({serializableCheck: false}), //disabling serializable check, because of the changes on the date in the store
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
