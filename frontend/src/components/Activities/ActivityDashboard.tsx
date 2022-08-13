import { Activity } from '../../models/activity';
import { useSelector } from 'react-redux';
import { useAppDispatch,RootState} from '../../store/store';
import classes from './ActivityDashboard.module.css';
import ActivityDetail from './ActivityDetails/ActivityDetail';
import ActivityForm from './ActivityForm/ActivityForm';
import ActivityList from './ActivityList/ActivityList';
type Props = {
  children?: React.ReactNode;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEditActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean
};
const ActivityDashboard: React.FC<Props> = ({
  editMode,
  openForm,
  closeForm,
  createOrEditActivity,
  deleteActivity,
  submitting,
}) => {
  const selectedActivity = useSelector((state:RootState) => state.activities.selectedActivity)
  return (
    <div className={classes.dashboardContainer}>
      <div className={classes.activityList}>
        <ActivityList
          closeForm={closeForm}
          deleteActivity={deleteActivity}
        />
      </div>
      <div className={classes.activityContainer}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            createOrEditActivity={createOrEditActivity}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
};

export default ActivityDashboard;
