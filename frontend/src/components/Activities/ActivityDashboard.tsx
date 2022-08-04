import { Activity } from '../../models/activity';
import classes from './ActivityDashboard.module.css';
import ActivityList from './ActivityList';
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
    </div>
  );
};

export default ActivityDashboard;
