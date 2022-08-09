import { Activity } from '../../models/activity';
import classes from './ActivityDashboard.module.css';
import ActivityDetail from './ActivityDetails/ActivityDetail';
import ActivityForm from './ActivityForm/ActivityForm';
import ActivityList from './ActivityList/ActivityList';
type Props = {
  children?: React.ReactNode;
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectingActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
};
const ActivityDashboard: React.FC<Props> = ({
  activities,
  selectedActivity,
  selectingActivity,
  cancelSelectedActivity,
}) => {
  return (
    <div className={classes.dashboardContainer}>
      <div className={classes.activityList}>
        <ActivityList
          activities={activities}
          selectingActivity={selectingActivity}
        />
      </div>
      <div className={classes.activityContainer}>
        {selectedActivity && <ActivityDetail activity={selectedActivity} cancelSelectedActivity={cancelSelectedActivity}/>}
        <ActivityForm />
      </div>
    </div>
  );
};

export default ActivityDashboard;
