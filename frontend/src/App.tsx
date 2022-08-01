import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const response = await axios.get('http://localhost:5000/api/activities');
    setActivities(response.data);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div>
        {activities.map((activity: any) => (
          <li key={activity.id}>{activity.title}</li>
        ))}
    </div>
  );
}

export default App;
