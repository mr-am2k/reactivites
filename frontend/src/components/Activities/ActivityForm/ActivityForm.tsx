import {  useEffect, useState } from 'react';
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
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../UI/Form/MyTextInput';
import MyTextArea from '../../UI/Form/MyTextArea';
import { categoryOptions } from '../../../assets/options/categoryOptions';
import MySelectInput from '../../UI/Form/MySelectInput';
import MyDateInput from '../../UI/Form/MyDateInput';
import { Activity } from '../../../models/activity';

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
    date: null,
    description: '',
    category: '',
    city: '',
    venue: '',
  };
  const [activity, setActivity] = useState<Activity>(initialState);

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required('The activity category is required'),
    date: Yup.string().required('The activity date is required').nullable(),
    venue: Yup.string().required('The activity venue is required'),
    city: Yup.string().required('The activity city is required'),
  });

  const submitHandler = async ( activity:Activity) => {
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
  // const handleChange = (
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.target;
  //   setActivity({ ...activity, [name]: value });
  // };

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
    <>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form
            className={classes.activityForm}
            onSubmit={handleSubmit}
            autoComplete='off'
          >
            <h3>Activity Details</h3>
            <MyTextInput name='title' placeholder='Title' />
            <MyTextArea rows={3} name='description' placeholder='Description' />
            <MySelectInput options={categoryOptions} name='category' placeholder='Category'/>
            <MyDateInput placeholderText='Date' name='date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />
            <h3>Location Details</h3>
            <MyTextInput name='city' placeholder='City' />
            <MyTextInput name='venue' placeholder='Venue' />

            <div className={classes.activityFormButtons}>
              {submitting && (
                <button className={classes.submitButtonLoading} type='submit'>
                  Loading...
                </button>
              )}
              {!submitting && (
                <button disabled={isSubmitting || !dirty || !isValid} className={classes.submitButton} type='submit'>
                  Submit
                </button>
              )}
              <Link to={'/activities/'}>
                <button className={classes.cancelButton}>Cancel</button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ActivityForm;
