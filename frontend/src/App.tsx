import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Activity } from './models/activity';
import { Navbar, ActivityDashboard } from './components/index';
import classes from './App.module.css';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const fetchActivities = async () => {
    const response = await axios.get<Activity[]>(
      'http://localhost:5000/api/activities'
    );
    setActivities(response.data);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className={classes.appContainer}>
          <ActivityDashboard activities={activities} />
      </div>
    </Fragment>
  );
}

export default App;
