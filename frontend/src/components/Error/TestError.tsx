import axios from 'axios';
import classes from './TestError.module.css';

const TestError = () => {
  const baseUrl = 'http://localhost:5000/api/';

  const notFoundHandler = () => {
    axios
      .get(baseUrl + 'error/not-found')
      .catch((err) => console.log(err.response));
  };
  const badRequestHandler = () => {
    axios
      .get(baseUrl + 'error/bad-request')
      .catch((err) => console.log(err.response));
  };
  const serverErrorHandler = () => {
    axios
      .get(baseUrl + 'error/server-error')
      .catch((err) => console.log(err.response));
  };
  const unauthorizedHandler = () => {
    axios
      .get(baseUrl + 'error/unauthorized')
      .catch((err) => console.log(err.response));
  };
  const badGuidHandler = () => {
    axios
      .get(baseUrl + 'activities/notaguid')
      .catch((err) => console.log(err.response));
  };
  const validationErrorHandler = () => {
    axios.post(baseUrl + 'activities', {}).catch((err) => console.log(err.response));
  };
  return (
    <div className={classes.testErrorContainer}>
      <div className={classes.testErrorHeading}>
        <h1>Test Error component</h1></div>
      <div className={classes.testErrorButtons}>
        <button onClick={notFoundHandler}>Not Found</button>
        <button onClick={badRequestHandler}>Bad request</button>
        <button onClick={validationErrorHandler}>Validation error</button>
        <button onClick={serverErrorHandler}>Server error</button>
        <button onClick={unauthorizedHandler}>Unauthorized</button>
        <button onClick={badGuidHandler} >Bad guid</button>
      </div>
    </div>
  );
};
export default TestError;
