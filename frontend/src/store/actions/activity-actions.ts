import { activityActions } from '../slices/activity-slice';
import { AppDispatch } from '../store';
import agent from '../../api/agent';
import { Activity } from '../../models/activity';

export const fetchActivities = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(activityActions.changeLoading(true));
    try {
      const data = await agent.Activities.list();
      let activities: Activity[] = [];
      data.forEach((activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      dispatch(activityActions.setActivities(activities));
      dispatch(activityActions.changeLoading(false));
      dispatch(groupedActivitiesByDate(activities))
    } catch (error) {
      console.log(error);
      dispatch(activityActions.changeLoading(false));
    }
  };
};

export const loadActivity = (id: string, activities?: Activity[]) => {
  return async (dispatch: AppDispatch) => {
    let activity = activities?.find((activity) => activity.id === id);
    if (activity) {
      //this case handles situation when we have our activity in memory
      dispatch(activityActions.setSelectedActivity(activity));
      return activity;
    } else {
      dispatch(activityActions.changeLoading(true));
      try {
        //this case handles situation when we need to fetch our activity from
        activity = await agent.Activities.details(id);
        dispatch(activityActions.setSelectedActivity(activity));
        dispatch(activityActions.changeLoading(false));
        return activity;
      } catch (error) {
        console.log(error);
        dispatch(activityActions.changeLoading(false));
      }
    }
  };
};

export const createOrEditActivity = (
  activity: Activity,
  activities: Activity[]
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(activityActions.changeSubmitting(true));
    const activityExist = activities.find((act) => act.id === activity.id);
    if (activityExist) {
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
        dispatch(activityActions.setSelectedActivity(activity));
        dispatch(activityActions.changeSubmitting(false));
      } catch (error) {
        console.log(error);
      }
    } else {
      //if id doesn't exist that means that we need to add new activity
      try {
        await agent.Activities.create(activity);
        dispatch(activityActions.setActivities([...activities, activity]));
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

export const groupedActivitiesByDate = (activities: Activity[]) => {
  //returning object that has array of activities group by date
  return (dispatch: AppDispatch) => {
    const newActivities = Object.entries(
      activities.reduce((activities, activity) => {
        const date = activity.date;
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
    dispatch(activityActions.setActivitiesGroupedByDate(newActivities))
  };
};
