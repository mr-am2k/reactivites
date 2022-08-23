import { FaFilter } from 'react-icons/fa';
import Calendar from 'react-calendar'
import classes from './ActivityFilters.module.css';

const ActivityFilters = () => {
  return (
    <div className={classes.activityFiltersContainer}>
      <div className={classes.activityFilters}>
        <div className={classes.header}>
          <h3>
            <FaFilter></FaFilter> Filters
          </h3>
        </div>
        <div className={classes.filter}>
          <h3>All Activities</h3>
        </div>
        <div className={classes.filter}>
          <h3>I'm going</h3>
        </div>
        <div className={classes.filter}>
          <h3>I'm interested</h3>
        </div>
      </div>
      <div className={classes.activityFiltersCalendar}>
        <Calendar/>
      </div>
    </div>
  );
};

export default ActivityFilters;
