import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Activity } from './models/activity';
import { Navbar } from './components/index';
import { CssBaseline, Container } from '@mui/material';

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
      <CssBaseline>
        <Container sx={{marginTop: '5rem'}}>
          {activities.map((activity) => (
            <li key={activity.id}>{activity.title}</li>
          ))}
        </Container>
      </CssBaseline>
    </Fragment>
  );
}

export default App;
