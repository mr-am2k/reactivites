import axios from 'axios';
import classes from './TestError.module.css';
import { useNavigate } from 'react-router-dom';
import ValidationErrors from './ValidationErrors/ValidationErrors';
import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { CommonActions } from '../../store/slices/common-slice';

const TestError = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const baseUrl = 'http://localhost:5000/api/';
  const [errors, setErrors] = useState(null);

  const notFoundHandler = () => {
    axios.get(baseUrl + 'error/not-found').catch((err) => {
      if (err.response.status === 404) navigate('/not-found');
    });
  };
  const badRequestHandler = () => {
    axios
      .get(baseUrl + 'error/bad-request')
      .catch((err) => console.log(err.response));
  };
  const serverErrorHandler = () => {
    axios.get(baseUrl + 'error/server-error').catch((err) => {
      dispatch(CommonActions.setServerError(err.response.data));
      navigate('/server-error');
    });
  };
  const unauthorizedHandler = () => {
    axios
      .get(baseUrl + 'error/unauthorized')
      .catch((err) => console.log(err.response));
  };
  const badGuidHandler = () => {
    axios
      .get(baseUrl + 'activities/notaguid')
      .catch((err) =>{
        navigate('/not-found')
      });
  };
  const validationErrorHandler = () => {
    axios.post(baseUrl + 'activities', {}).catch((err) => setErrors(err));
  };
  return (
    <div className={classes.testErrorContainer}>
      <div className={classes.testErrorHeading}>
        <h1>Test Error component</h1>
      </div>
      <div className={classes.testErrorButtons}>
        <button onClick={notFoundHandler}>Not Found</button>
        <button onClick={badRequestHandler}>Bad Request</button>
        <button onClick={validationErrorHandler}>Validation Error</button>
        <button onClick={serverErrorHandler}>Server Error</button>
        <button onClick={unauthorizedHandler}>Unauthorized</button>
        <button onClick={badGuidHandler}>Bad Guid</button>
      </div>
      {errors && <ValidationErrors errors={errors} />}
    </div>
  );
};
export default TestError;
