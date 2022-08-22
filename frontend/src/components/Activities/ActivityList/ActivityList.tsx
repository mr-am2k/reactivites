import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import ActivityListItem from './ActivityListItem/ActivityListItem';

const ActivityList = () => {
  const activities = useSelector(
    (state: RootState) => state.activities.activities
  );
  return (
    <>
      {activities.map((activity, index) => (
        <ActivityListItem activity={activity} key={index} />
      ))}
    </>
  );
};

export default ActivityList;
