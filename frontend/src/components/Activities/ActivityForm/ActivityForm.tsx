import classes from './ActivityForm.module.css';

const ActivityForm = () => {
  return (
    <form className={classes.activityForm}>
      <input placeholder='Title' />
      <textarea placeholder='Description' />
      <input placeholder='Category' />
      <input placeholder='Date' />
      <input placeholder='City' />
      <input placeholder='Venue' />
      <div className={classes.activityFormButtons}>
        <button className={classes.submitButton} type='submit'>Submit</button>
        <button className={classes.cancelButton}>Cancel</button>
      </div>
    </form>
  );
};

export default ActivityForm;
