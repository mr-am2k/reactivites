import { activityActions } from '../slices/activity-slice';
import { AppDispatch } from '../store';
import agent from '../../api/agent';
import { Activity } from '../../models/activity';

export const fetchActivities = () => {
  return async (dispatch: AppDispatch) => {
    const data = await agent.Activities.list();
    let activities: Activity[] = [];
    data.forEach((activity:Activity) => {
      activity.date = activity.date.split('T')[0];
      activities.push(activity);
    });
    console.log(activities);
    dispatch(activityActions.setActivities(activities));
  };
};

export const changeSelectedActivity = (id: string, activities: Activity[]) => {
  return (dispatch: AppDispatch) => {
    const selectedActivity = activities.find((activity) => activity.id === id);
    console.log(selectedActivity);
    dispatch(activityActions.setSelectedActivity(selectedActivity));
  };
};
