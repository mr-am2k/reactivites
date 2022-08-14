import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import classes from './ActivityDashboard.module.css';
import ActivityDetail from './ActivityDetails/ActivityDetail';
import ActivityForm from './ActivityForm/ActivityForm';
import ActivityList from './ActivityList/ActivityList';

const ActivityDashboard = () => {
  const selectedActivity = useSelector(
    (state: RootState) => state.activities.selectedActivity
  );
  const editMode = useSelector((state: RootState) => state.activities.editMode);
  return (
    <div className={classes.dashboardContainer}>
      <div className={classes.activityList}>
        <ActivityList />
      </div>
      <div className={classes.activityContainer}>
        {selectedActivity && !editMode && <ActivityDetail />}
        {editMode && <ActivityForm />}
      </div>
    </div>
  );
};

export default ActivityDashboard;
