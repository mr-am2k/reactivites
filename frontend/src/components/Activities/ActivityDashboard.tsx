import { Activity } from '../../models/activity';
import classes from './ActivityDashboard.module.css';
import ActivityDetail from './ActivityDetails/ActivityDetail';
import ActivityList from './ActivityList/ActivityList';
type Props = {
  children?: React.ReactNode;
  activities: Activity[];
};
const ActivityDashboard: React.FC<Props> = ({ activities }) => {
  return (
    <div className={classes.dashboardContainer}>
      <div className={classes.activityList}>
        <ActivityList activities={activities} />
      </div>
      <div className={classes.activityContainer}>
          <ActivityDetail activity={activities[0]}/>
      </div>
    </div>
  );
};

export default ActivityDashboard;
