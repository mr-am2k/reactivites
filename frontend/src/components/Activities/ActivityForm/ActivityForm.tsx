import { ChangeEvent, FormEvent, useState } from 'react';
import { Activity } from '../../../models/activity';
import classes from './ActivityForm.module.css';

type Props = {
  children?: React.ReactNode;
  activity: Activity | undefined;
  closeForm: () => void;
};

const ActivityForm: React.FC<Props> = ({
  activity: selectedActivity,
  closeForm,
}) => {
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
    console.log(activity);
  };
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
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
        <button className={classes.submitButton} type='submit'>
          Submit
        </button>
        <button className={classes.cancelButton} onClick={closeForm}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;
