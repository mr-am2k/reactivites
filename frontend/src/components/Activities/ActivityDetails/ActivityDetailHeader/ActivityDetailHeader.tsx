import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Activity } from '../../../../models/activity';
import classes from './ActivityDetailHeader.module.css';

type Props = {
  children?: React.ReactNode;
  activity: Activity;
};

const ActivityDetailHeader: React.FC<Props> = ({ activity }) => {
  let cutDescription = '';
  activity.description.length > 60
    ? (cutDescription = `${activity.description.substring(0, 60)}...`)
    : (cutDescription = activity.description);
  return (
    <div className={classes.activityDetailInfoContainer}>
      <div className={classes.imageContainer}>
        <div className={classes.activityImage}>
          <img
            src='https://thetourguy.com/wp-content/uploads/2021/10/Most-Historic-Pubs-in-London-1440-x-675.jpg'
            alt='text'
          />
        </div>
        <div className={classes.overlay}></div>
        <div className={classes.activityContent}>
          <h2>{activity?.title}</h2>
          <h4>{format(activity?.date!, 'dd MMM yyyy')}</h4>
          <h4>{cutDescription}</h4>
        </div>
      </div>
      <div className={classes.buttonsContainer}>
        <div className={classes.activityActionButtons}>
          <button className={classes.joinButton}>Join Activity</button>
          <button className={classes.cancelButton}>Cancel attendance</button>
        </div>
        <div className={classes.activityManageButton}>
          <Link to={`/manage/${activity.id}`}>
            <button className={classes.manageButton}>Mange Event</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailHeader;
