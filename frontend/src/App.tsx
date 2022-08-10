import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Activity } from './models/activity';
import { Navbar, ActivityDashboard } from './components/index';
import {v4 as uuid} from 'uuid'
import classes from './App.module.css';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  const fetchActivities = async () => {
    const response = await axios.get<Activity[]>(
      'http://localhost:5000/api/activities'
    );
    setActivities(response.data);
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
    activity.id
      ? setActivities([
          ...activities.filter((oldActivity) => oldActivity.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, {...activity, id: uuid()}]); //solving problem with id creation using uuid package
    setEditMode(false);
    setSelectedActivity(activity);
  };

  const deleteActivityHandler=(id:string)=> {
    setActivities([...activities.filter(activity => activity.id !== id)])
  }

  useEffect(() => {
    fetchActivities();
  }, []);

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
          deleteActivity = {deleteActivityHandler}
        />
      </div>
    </Fragment>
  );
}

export default App;
