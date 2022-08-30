import { Fragment } from 'react';
import {
  Navbar,
  ActivityDashboard,
  HomePage,
  ActivityForm,
  ActivityDetail,
  TestError,
  NotFound,
  ServerError
} from './components/index';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Fragment>
      <ToastContainer position='bottom-right' hideProgressBar/>
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
                  <Route path='/errors' element={<TestError/>}/>
                  <Route path='/server-error' element={<ServerError/>}/>
                  <Route path='/*' element={<NotFound/>} /> {/*If our route doesn't match any of the above, it will display NotFound component */}
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
