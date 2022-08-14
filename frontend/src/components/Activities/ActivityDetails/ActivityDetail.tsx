import { useSelector } from 'react-redux';
import { openForm } from '../../../store/actions/activity-actions';
import { activityActions } from '../../../store/slices/activity-slice';
import { useAppDispatch, RootState } from '../../../store/store';
import classes from './ActivityDetails.module.css';

const ActivityDetail = () => {
  const dispatch = useAppDispatch();
  const activity = useSelector(
    (state: RootState) => state.activities.selectedActivity
  );
  const activities = useSelector(
    (state: RootState) => state.activities.activities
  );
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
        <button
          className={classes.editButton}
          onClick={() => dispatch(openForm(activity!.id, activities))}
        >
          Edit
        </button>
        <button
          className={classes.cancelButton}
          onClick={() => {
            dispatch(activityActions.cancelSelectedActivity());
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ActivityDetail;
