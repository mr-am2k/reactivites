import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  createOrEditActivity,
} from '../../../store/actions/activity-actions';
import { useAppDispatch, RootState } from '../../../store/store';
import classes from './ActivityForm.module.css';

const ActivityForm = () => {
  const dispatch = useAppDispatch();
  const selectedActivity = useSelector(
    (state: RootState) => state.activities.selectedActivity
  );
  const activities = useSelector(
    (state: RootState) => state.activities.activities
  );
  const submitting = useSelector(
    (state: RootState) => state.activities.submitting
  );
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: '',
  };
  const [activity, setActivity] = useState(initialState);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createOrEditActivity(activity, activities));
  };
  const inputChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };
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

        <button
          className={classes.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;
