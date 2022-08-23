import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchActivities } from '../../store/actions/activity-actions';
import { activityActions } from '../../store/slices/activity-slice';
import { RootState, useAppDispatch } from '../../store/store';
import Loading from '../../UI/Loading';
import classes from './ActivityDashboard.module.css';
import ActivityFilters from './ActivityFilters/ActivityFilters';
import ActivityList from './ActivityList/ActivityList';

const ActivityDashboard = () => {
  const dispatch = useAppDispatch();
  const activities = useSelector(
    (state: RootState) => state.activities.activities
  );
  const loading = useSelector((state: RootState) => state.activities.loading);

  const onPageLoad = useCallback(async () => {
    //this code is in separate function, because changeLoading needs to happen after fetching activities and async await can't be used in useEffect
    if (activities.length === 0) {
      await dispatch(fetchActivities());
      dispatch(activityActions.changeLoading(false));
    }
  }, [activities.length, dispatch]);

  useEffect(() => {
    onPageLoad();
  }, [onPageLoad]);

  if (loading) return <Loading content='Loading app...' />;
  return (
    <div className={classes.dashboardContainer}>
      <div className={classes.activityList}>
        <ActivityList />
      </div>
      <div className={classes.activityFilters}>
        <ActivityFilters/>
      </div>
    </div>
  );
};

export default ActivityDashboard;
