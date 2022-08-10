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
  createOrEditActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
};
const ActivityDashboard: React.FC<Props> = ({
  activities,
  selectedActivity,
  selectingActivity,
  cancelSelectedActivity,
  editMode,
  openForm,
  closeForm,
  createOrEditActivity,
  deleteActivity
}) => {
  return (
    <div className={classes.dashboardContainer}>
      <div className={classes.activityList}>
        <ActivityList
          activities={activities}
          selectingActivity={selectingActivity}
          closeForm={closeForm}
          deleteActivity={deleteActivity}
        />
      </div>
      <div className={classes.activityContainer}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            activity={selectedActivity}
            cancelSelectedActivity={cancelSelectedActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
            createOrEditActivity={createOrEditActivity}
          />
        )}
      </div>
    </div>
  );
};

export default ActivityDashboard;
