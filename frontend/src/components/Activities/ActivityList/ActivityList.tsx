import { Activity } from '../../../models/activity';
import classes from './ActivityList.module.css';
type Props = {
  children?: React.ReactNode;
  activities: Activity[];
  selectingActivity: (id: string) => void;

};

const ActivityList: React.FC<Props> = ({ activities, selectingActivity }) => {
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
            <button onClick={() => selectingActivity(activity.id)}>View</button>
          </div>
          <hr/>
        </div>
      ))}
    </>
  );
};

export default ActivityList;
