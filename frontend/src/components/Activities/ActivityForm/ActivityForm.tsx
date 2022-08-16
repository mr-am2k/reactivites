import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { activityActions } from '../../../store/slices/activity-slice';
import { Link, useParams } from 'react-router-dom';
import {
  createOrEditActivity,
  loadActivity,
} from '../../../store/actions/activity-actions';
import { useAppDispatch, RootState } from '../../../store/store';
import classes from './ActivityForm.module.css';
import Loading from '../../../UI/Loading';

const ActivityForm = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const loading = useSelector(
    (state: RootState) => state.activities.loading
  );
  const activities = useSelector(
    (state: RootState) => state.activities.activities
  );
  const submitting = useSelector(
    (state: RootState) => state.activities.submitting
  );
  const [activity, setActivity] = useState({
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: '',
  });

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(createOrEditActivity(activity, activities));
  };
  const inputChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const onPageLoad = useCallback(async () => {
    if (id) {
      const activity = await dispatch(loadActivity(id, activities));
      setActivity(activity!);
    }
  }, [activities, dispatch, id]);

  useEffect(() => {
    onPageLoad();
  }, [onPageLoad]);

  if(loading) return <Loading/>

  return (
    <form
      className={classes.activityForm}
      onSubmit={submitHandler}
      autoComplete='off'
    >
      <input
        placeholder='Title'
        value={activity.title}
        name='title'
        onChange={inputChangeHandler}
      />
      <textarea
        placeholder='Description'
        value={activity.description}
        name='description'
        onChange={inputChangeHandler}
      />
      <input
        placeholder='Category'
        value={activity.category}
        name='category'
        onChange={inputChangeHandler}
      />
      <input
        type='date'
        placeholder='Date'
        value={activity.date}
        name='date'
        onChange={inputChangeHandler}
      />
      <input
        placeholder='City'
        value={activity.city}
        name='city'
        onChange={inputChangeHandler}
      />
      <input
        placeholder='Venue'
        value={activity.venue}
        name='venue'
        onChange={inputChangeHandler}
      />
      <div className={classes.activityFormButtons}>
        {submitting && (
          <button className={classes.submitButtonLoading} type='submit'>
            Loading...
          </button>
        )}
        {!submitting && (

          <button className={classes.submitButton} type='submit'>
            Submit
          </button>
        )}
        <Link to={`/activities/${activity.id}`}>
          <button className={classes.cancelButton}>Cancel</button>
        </Link>
      </div>
    </form>
  );
};

export default ActivityForm;
