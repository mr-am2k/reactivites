import { useEffect, Fragment, useCallback } from 'react';
import { Navbar, ActivityDashboard } from './components/index';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from './store/store';
import { fetchActivities } from './store/actions/activity-actions';
import { activityActions } from './store/slices/activity-slice';
import classes from './App.module.css';
import Loading from './UI/Loading';
function App() {
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.activities.loading);

  const onPageLoad = useCallback(async () => {
    //this code is in separate function, because changeLoading needs to happen after fetching activities and async await can't be used in useEffect
    await dispatch(fetchActivities());
    dispatch(activityActions.changeLoading(false));
  }, [dispatch]);

  useEffect(() => {
    onPageLoad();
  }, [onPageLoad]);

  if (loading) return <Loading content='Loading app...' />;

  return (
    <Fragment>
      <Navbar />
      <div className={classes.appContainer}>
        <ActivityDashboard />
      </div>
    </Fragment>
  );
}

export default App;
