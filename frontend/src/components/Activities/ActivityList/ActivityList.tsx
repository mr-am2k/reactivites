import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import ActivityListItem from './ActivityListItem/ActivityListItem';
import classes from './ActivityList.module.css';
import { Fragment } from 'react';

const ActivityList = () => {

  const activitiesGroupedByDate = useSelector(
    (state: RootState) => state.activities.activitiesGroupedByDate
  );
  return (
    <>
      {activitiesGroupedByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <h3 className={classes.activitiesGroupHeading}>{group}</h3>
  
            {activities.map((activity, index) => (
              <ActivityListItem activity={activity} key={index} />
            ))}

        </Fragment>
      ))}
    </>
  );
};

export default ActivityList;
