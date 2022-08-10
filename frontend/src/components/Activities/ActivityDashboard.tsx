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
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
};
const ActivityDashboard: React.FC<Props> = ({
  activities,
  selectedActivity,
  selectingActivity,
  cancelSelectedActivity,
  editMode,
  openForm,
  closeForm,
}) => {
  return (
    <div className={classes.dashboardContainer}>
      <div className={classes.activityList}>
        <ActivityList
          activities={activities}
          selectingActivity={selectingActivity}
          closeForm={closeForm}
        />
      </div>
      <div className={classes.activityContainer}>
        {selectedActivity && !editMode &&(
          <ActivityDetail
            activity={selectedActivity}
            cancelSelectedActivity={cancelSelectedActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm closeForm={closeForm} activity={selectedActivity} />
        )}
      </div>
    </div>
  );
};

export default ActivityDashboard;
