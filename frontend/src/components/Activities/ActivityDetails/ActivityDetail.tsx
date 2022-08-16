import { useSelector } from 'react-redux';
import { loadActivity } from '../../../store/actions/activity-actions';
import { useAppDispatch, RootState } from '../../../store/store';
import { useParams } from 'react-router-dom';
import classes from './ActivityDetails.module.css';
import { useEffect } from 'react';
import Loading from '../../../UI/Loading';

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
    <div className={classes.activityContainer}>
      <div className={classes.activityImage}>
        <img
          src='https://thetourguy.com/wp-content/uploads/2021/10/Most-Historic-Pubs-in-London-1440-x-675.jpg'
          alt='text'
        />
      </div>
      <div className={classes.activityContent}>
        <h3>{activity?.title}</h3>
        <p>{activity?.date}</p>
        <p>{activity?.description}</p>
      </div>
      <div className={classes.activityButtons}>
        <button className={classes.editButton}>Edit</button>
        <button className={classes.cancelButton}>Cancel</button>
      </div>
    </div>
  );
};

export default ActivityDetail;
