import { useState } from 'react';
import { changeSelectedActivity } from '../../../store/actions/activity-actions';
import { useAppDispatch, RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import classes from './ActivityList.module.css';
type Props = {
  children?: React.ReactNode;
  closeForm: () => void;
  deleteActivity: (id: string) => void;
};

const ActivityList: React.FC<Props> = ({ closeForm, deleteActivity }) => {
  const activities = useSelector((state: RootState) => state.activities.activities);
  const deleting = useSelector((state: RootState) => state.activities.deleting);
  const dispatch = useAppDispatch();
  const [target, setTarget] = useState('');
  const activityDeleteHandler = (
    event: React.SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
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
            <button
              className={classes.viewButton}
              onClick={() => {
                dispatch(changeSelectedActivity(activity.id, activities));
                closeForm();
              }}
            >
              View
            </button>
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
