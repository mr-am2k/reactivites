import { useState, useEffect, Fragment } from 'react';
import { Activity } from './models/activity';
import { Navbar, ActivityDashboard } from './components/index';
import { v4 as uuid } from 'uuid';
import classes from './App.module.css';
import agent from './api/agent';
import Loading from './UI/Loading';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false)

  const fetchActivities = async () => {
    const response = await agent.Activities.list();
    let activities: Activity[] = [];
    response.forEach((activity) => {
      activity.date = activity.date.split('T')[0];
      activities.push(activity);
    });
    setActivities(activities);
    setLoading(false);
  };

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
    setDeleting(true)
    if(selectedActivity?.id === id) {
      setSelectedActivity(undefined)
    }
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((activity) => activity.id !== id)]);
      setDeleting(false)
    });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  if (loading) return <Loading content='Loading app...' />;

  return (
    <Fragment>
      <Navbar openForm={openFormHandler} />
      <div className={classes.appContainer}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectingActivity={selectedActivityHandler}
          cancelSelectedActivity={cancelSelectActivityHandler}
          editMode={editMode}
          openForm={openFormHandler}
          closeForm={closeFormHandler}
          createOrEditActivity={createOrEditActivityHandler}
          deleteActivity={deleteActivityHandler}
          submitting={submitting}
          deleting={deleting}
        />
      </div>
    </Fragment>
  );
}

export default App;
