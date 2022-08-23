import { Fragment } from 'react';
import {
  Navbar,
  ActivityDashboard,
  HomePage,
  ActivityForm,
  ActivityDetail,
} from './components/index';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <HomePage />
            </div>
          }
        />
        <Route
          path='/*'
          element={
            <>
              <Navbar />
              <div className={classes.appContainer}>
                <Routes>
                  <Route path='/activities' element={<ActivityDashboard />} />
                  <Route path='/activities/:id' element={<ActivityDetail />} />
                  <Route path='/createactivity' element={<ActivityForm />} />
                  <Route path='/manage/:id' element={<ActivityForm />} />
                </Routes>
              </div>
            </>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
