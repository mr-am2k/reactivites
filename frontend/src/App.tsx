import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Activity } from './models/activity';
import { Navbar, ActivityDashboard } from './components/index';
import classes from './App.module.css';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

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

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className={classes.appContainer}>
        <ActivityDashboard 
        activities={activities}
        selectedActivity = {selectedActivity}
        selectingActivity = {selectedActivityHandler}
        cancelSelectedActivity = {cancelSelectActivityHandler}
        />
      </div>
    </Fragment>
  );
}

export default App;
