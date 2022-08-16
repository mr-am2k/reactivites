import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  createOrEditActivity,
  loadActivity,
} from '../../../store/actions/activity-actions';
import { useAppDispatch, RootState } from '../../../store/store';
import classes from './ActivityForm.module.css';
import Loading from '../../../UI/Loading';
import { activityActions } from '../../../store/slices/activity-slice';
import { v4 as uuid } from 'uuid';

const ActivityForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const loading = useSelector((state: RootState) => state.activities.loading);
  const activities = useSelector(
    (state: RootState) => state.activities.activities
  );
  const submitting = useSelector(
    (state: RootState) => state.activities.submitting
  );
  const initialState = {
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: '',
  };
  const [activity, setActivity] = useState(initialState);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //if activity object has id that is empty string, that means that we are creating new activity and that we need to create id for it
    if (activity.id.length === 0) {
      const newActivity = { ...activity, id: uuid() };
      await dispatch(createOrEditActivity(newActivity, activities));
      navigate(`/activities/${newActivity.id}`);
    } else {
      await dispatch(createOrEditActivity(activity, activities));
      navigate(`/activities/${activity.id}`);
    }
  };
  const inputChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  useEffect(() => {
    if (id) {
      dispatch(loadActivity(id, activities)).then((activity) => {
        setActivity(activity!);
        dispatch(activityActions.changeLoading(false));
      });
      // if there is no id, that means that we are creating new activity and we need to empty values for input fields
    } else {
      setActivity(initialState);
      dispatch(activityActions.changeLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities, dispatch, id]);

  if (loading) return <Loading />;

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
        <Link to={'/activities/'}>
          <button className={classes.cancelButton}>Cancel</button>
        </Link>
      </div>
    </form>
  );
};

export default ActivityForm;
