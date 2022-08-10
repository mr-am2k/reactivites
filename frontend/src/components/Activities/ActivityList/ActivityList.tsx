import { Activity } from '../../../models/activity';
import classes from './ActivityList.module.css';
type Props = {
  children?: React.ReactNode;
  activities: Activity[];
  selectingActivity: (id: string) => void;
  closeForm: () => void;
  deleteActivity: (id: string) => void;
};

const ActivityList: React.FC<Props> = ({
  activities,
  selectingActivity,
  closeForm,
  deleteActivity
}) => {
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
                selectingActivity(activity.id);
                closeForm();
              }}
            >
              View
            </button>
            <button
             className={classes.deleteButton}
              onClick={() => {
                deleteActivity(activity.id);
              }}
            >
              Delete Activity
            </button>
          </div>
          <hr />
        </div>
      ))}
    </>
  );
};

export default ActivityList;
