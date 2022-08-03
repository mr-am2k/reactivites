import { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity } from './models/activity';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const fetchActivities = async () => {
    const response = await axios.get<Activity[]>('http://localhost:5000/api/activities');
    setActivities(response.data);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div>
      {activities.map((activity) => (
        <li key={activity.id}>{activity.title}</li>
      ))}
    </div>
  );
}

export default App;
