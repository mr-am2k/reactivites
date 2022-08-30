import classes from './SerrverError.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store';

const ServerError = () => {
  const error = useSelector(
    (state: RootState) => state.common?.error
  );
  return (
    <div className={classes.serverErrorContainer}>
      <h3>
       {error?.message}
      </h3>
      <div className={classes.serverErrorContent}>
        <h4>
          Stack trace
        </h4>
        <p>
          {error?.details}
        </p>
      </div>
    </div>
  )
}

export default ServerError