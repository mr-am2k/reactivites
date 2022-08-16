import { useState } from 'react';
import {
  deleteActivity,
} from '../../../store/actions/activity-actions';
import { useAppDispatch, RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import classes from './ActivityList.module.css';
import { Link } from 'react-router-dom';

const ActivityList = () => {
  const dispatch = useAppDispatch();
  const activities = useSelector(
    (state: RootState) => state.activities.activities
  );
  const selectedActivity = useSelector(
    (state: RootState) => state.activities.selectedActivity
  );
  const deleting = useSelector((state: RootState) => state.activities.deleting);
  const [target, setTarget] = useState('');
  const activityDeleteHandler = (
    event: React.SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(event.currentTarget.name);
    dispatch(deleteActivity(id, selectedActivity!, activities));
  };
  return (
    <>
      {activities.map((activity, index) => (
        <div className={classes.activityContainer} key={index}>
          <div className={classes.activityContent}>
            <h3>{activity.title}</h3>
            <p>{activity.date}</p>
            <h5>{activity.description}</h5>
            <h5 className={classes.descriptionContent}>{activity.city}, </h5>
            <h5 className={classes.descriptionContent}>{activity.venue}</h5>
            <p className={classes.activityCategory}>{activity.category}</p>
          </div>
          <div className={classes.activityButton}>
            <Link to={`/activities/${activity.id}`}>
              <button className={classes.viewButton}>View</button>
            </Link>

            {deleting && target === activity.id && (
              <button
                name={activity.id}
                className={classes.deleteButton}
                onClick={(event) => {
                  activityDeleteHandler(event, activity.id);
                }}
              >
                Loading...
              </button>
            )}
            {deleting && target !== activity.id && (
              <button
                name={activity.id}
                className={classes.deleteButton}
                onClick={(event) => {
                  activityDeleteHandler(event, activity.id);
                }}
              >
                Delete Activity
              </button>
            )}
            {!deleting && (
              <button
                name={activity.id}
                className={classes.deleteButton}
                onClick={(event) => {
                  activityDeleteHandler(event, activity.id);
                }}
              >
                Delete Activity
              </button>
            )}
          </div>
          <hr />
        </div>
      ))}
    </>
  );
};

export default ActivityList;
