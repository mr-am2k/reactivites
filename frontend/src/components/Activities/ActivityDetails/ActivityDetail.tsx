import { useSelector } from 'react-redux';
import { loadActivity } from '../../../store/actions/activity-actions';
import { useAppDispatch, RootState } from '../../../store/store';
import { Link, useParams } from 'react-router-dom';
import classes from './ActivityDetails.module.css';
import { useEffect } from 'react';
import Loading from '../../../UI/Loading';
import ActivityDetailInfo from './ActivityDetailInfo/ActivityDetailInfo';
import ActivityDetailChat from './ActivityDetailChat/ActivityDetailChat';
import ActivityDetailHeader from './ActivityDetailHeader/ActivityDetailHeader';
import ActivityDetailSidebar from './ActivityDetailSidebar/ActivityDetailSidebar';

const ActivityDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const activity = useSelector(
    (state: RootState) => state.activities.selectedActivity
  );
  const activities = useSelector(
    (state: RootState) => state.activities.activities
  );
  useEffect(() => {
    if (id) {
      dispatch(loadActivity(id, activities));
    }
  }, [activities, dispatch, id]);

  if (!activity) return <Loading content='Loading app...' />;

  return (
    <div className={classes.activityDetailContainer}>
      <div className={classes.activityDetailInfo}>
        <ActivityDetailHeader activity={activity}/>
        <ActivityDetailInfo />
        <ActivityDetailChat />
      </div>
      <div className={classes.activityDetailSidebar}>
        <ActivityDetailSidebar />
      </div>
    </div>
  );
};

export default ActivityDetail;
