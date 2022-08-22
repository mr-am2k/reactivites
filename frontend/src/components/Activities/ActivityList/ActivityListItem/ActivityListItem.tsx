import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Activity } from '../../../../models/activity';
import { deleteActivity } from '../../../../store/actions/activity-actions';
import { RootState, useAppDispatch } from '../../../../store/store';
import { AiFillClockCircle } from 'react-icons/ai';
import { HiLocationMarker } from 'react-icons/hi';
import classes from './ActivityListItem.module.css';
import user from '../../../../assets/user.png';

type Props = {
  children?: React.ReactNode;
  activity: Activity;
};

const ActivityListItem: React.FC<Props> = ({ activity }) => {
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
    <div className={classes.activityItemContainer}>
      <div className={classes.activityHeader}>
        <img src={user} alt='user' />
        <div className={classes.activityHeaderInfo}>
          <h3>{activity.title}</h3>
          <h4>Hosted by User</h4>
        </div>
      </div>
      <div className={classes.activityInfo}>
        <div className={classes.activityInfoDate}>
          <h3>{<AiFillClockCircle />}</h3>
          <h3>{activity.date}</h3>
        </div>
        <div className={classes.activityInfoVenue}>
          <h3>{<HiLocationMarker />}</h3>
          <h3>{activity.venue}</h3>
        </div>
      </div>
      <div className={classes.activityAttendees}>
        <h5>Attendees go here</h5>
      </div>
      <div className={classes.activityDescription}>
        <h4>{activity.description}</h4>
        <Link to={`/activities/${activity.id}`}>
          <button>View</button>
        </Link>
      </div>
    </div>
  );
};

export default ActivityListItem;
