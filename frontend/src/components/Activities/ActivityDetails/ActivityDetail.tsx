import { Activity } from '../../../models/activity';
import classes from './ActivityDetails.module.css';

type Props = {
  children?: React.ReactNode;
  activity: Activity;
  cancelSelectedActivity: () => void;
  openForm: (id:string) => void;
};

const ActivityDetail: React.FC<Props> = ({ activity, cancelSelectedActivity, openForm }) => {
  return (
    <div className={classes.activityContainer}>
      <div className={classes.activityImage}>
        <img
          src='https://thetourguy.com/wp-content/uploads/2021/10/Most-Historic-Pubs-in-London-1440-x-675.jpg'
          alt='text'
        />
      </div>
      <div className={classes.activityContent}>
        <h3>{activity?.title}</h3>
        <p>{activity?.date}</p>
        <p>{activity?.description}</p>
      </div>
      <div className={classes.activityButtons}>
        <button className={classes.editButton} onClick={() => openForm(activity.id)}>Edit</button>
        <button className={classes.cancelButton} onClick={cancelSelectedActivity }>Cancel</button>
      </div>
    </div>
  );
};

export default ActivityDetail;