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
      <Navbar />
      <div className={classes.appContainer}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/activities' element={<ActivityDashboard />} />
          <Route path='/activities/:id' element={<ActivityDetail />} />
          <Route path='/createActivity' element={<ActivityForm />} />
          <Route path='/manage/:id' element={<ActivityForm />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
