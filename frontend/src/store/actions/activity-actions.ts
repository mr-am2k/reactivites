import { activityActions } from '../slices/activity-slice';
import { AppDispatch } from '../store';
import agent from '../../api/agent';
import { v4 as uuid } from 'uuid';
import { Activity } from '../../models/activity';

export const fetchActivities = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const data = await agent.Activities.list();
      let activities: Activity[] = [];
      data.forEach((activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      dispatch(activityActions.setActivities(activities));
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeSelectedActivity = (id: string, activities: Activity[]) => {
  return (dispatch: AppDispatch) => {
    const selectedActivity = activities.find((activity) => activity.id === id);
    dispatch(activityActions.setSelectedActivity(selectedActivity));
  };
};

export const openForm = (id?: string, activities?: Activity[]) => {
  return (dispatch: AppDispatch) => {
    id
      ? changeSelectedActivity(id, activities!)
      : dispatch(activityActions.cancelSelectedActivity());
    dispatch(activityActions.changeEditMode(true));
  };
};

export const closeForm = () => {
  return (dispatch: AppDispatch) => {
    dispatch(activityActions.changeEditMode(false));
  };
};

export const createOrEditActivity = (
  activity: Activity,
  activities: Activity[]
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(activityActions.changeSubmitting(true));

    if (activity.id) {
      //if id exists that means that we need to edit activity
      try {
        await agent.Activities.update(activity);
        dispatch(
          activityActions.setActivities([
            ...activities.filter(
              (oldActivity) => oldActivity.id !== activity.id
            ),
            activity,
          ])
        );
        dispatch(activityActions.changeEditMode(false));
        dispatch(activityActions.setSelectedActivity(activity));
        dispatch(activityActions.changeSubmitting(false));
      } catch (error) {
        console.log(error);
      }
    } else {
      //if id doesn't exist that means that we need to add new activity
      activity.id = uuid();
      try {
        await agent.Activities.create(activity);
        dispatch(activityActions.setActivities([...activities, activity]));
        dispatch(activityActions.changeEditMode(false));
        dispatch(activityActions.setSelectedActivity(activity));
        dispatch(activityActions.changeSubmitting(false));
      } catch (error) {
        console.log(error);
      }
    }
  };
};

export const deleteActivity = (
  id: string,
  selectedActivity: Activity,
  activities: Activity[]
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(activityActions.changeDeleting(true));
      if (selectedActivity.id === id) {
        dispatch(activityActions.cancelSelectedActivity());
      }
      await agent.Activities.delete(id);
      dispatch(
        activityActions.setActivities([
          ...activities.filter((activity) => activity.id !== id),
        ])
      );
      dispatch(activityActions.changeDeleting(false));
    } catch (error) {
      console.log(error);
    }
  };
};
