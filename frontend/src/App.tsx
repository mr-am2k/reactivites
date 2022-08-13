import { useState, useEffect, Fragment } from 'react';
import { Activity } from './models/activity';
import { Navbar, ActivityDashboard } from './components/index';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { useAppDispatch,RootState} from './store/store';
import { fetchActivities } from './store/actions/activity-actions';
import { activityActions } from './store/slices/activity-slice';
import classes from './App.module.css';
import agent from './api/agent';
import Loading from './UI/Loading';
function App() {
  const dispatch=useAppDispatch()
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const activities2 = useSelector((state:RootState) => state.activities.activities)



  const selectedActivityHandler = (id: string) => {
    setSelectedActivity(activities.find((activity) => activity.id === id));
  };

  const cancelSelectActivityHandler = () => {
    setSelectedActivity(undefined);
  };

  const openFormHandler = (id?: string) => {
    id ? selectedActivityHandler(id) : cancelSelectActivityHandler();
    setEditMode(true);
  };

  const closeFormHandler = () => {
    setEditMode(false);
  };

  const createOrEditActivityHandler = (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((oldActivity) => oldActivity.id !== activity.id),
          activity,
        ]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities,activity]); //solving problem with id creation using uuid package
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    }
  };

  const deleteActivityHandler = (id: string) => {
    dispatch(activityActions.setDeleting(true))
    if(selectedActivity?.id === id) {
      setSelectedActivity(undefined)
    }
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((activity) => activity.id !== id)]);
      dispatch(activityActions.setDeleting(false))
    });
  };

  useEffect(() => {
    dispatch(fetchActivities())
  }, [dispatch]);

  if (loading) return <Loading content='Loading app...' />;

  return (
    <Fragment>
      <Navbar openForm={openFormHandler} />
      <div className={classes.appContainer}>
        <ActivityDashboard
          editMode={editMode}
          openForm={openFormHandler}
          closeForm={closeFormHandler}
          createOrEditActivity={createOrEditActivityHandler}
          deleteActivity={deleteActivityHandler}
          submitting={submitting}
        />
      </div>
    </Fragment>
  );
}

export default App;
