import { Activity } from '../../../../models/activity';
import classes from './ActivityDetailInfo.module.css';
import { FaInfo, FaCalendar } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
type Props = {
  children?: React.ReactNode;
  activity: Activity;
};

const ActivityDetailInfo: React.FC<Props> = ({ activity }) => {
  return (
    <div className={classes.activityDetailInfoContainer}>
      <div className={classes.activityDetailInfoDescription}>
        <h3>
          {' '}
          <FaInfo className={classes.icon} />
        </h3>
        <h3>{activity.description}</h3>
      </div>
      <div className={classes.activityDetailInfoDate}>
        <h3>
          <FaCalendar className={classes.icon} />
        </h3>
        <h3>{activity.date}</h3>
      </div>
      <div className={classes.activityDetailInfoLocation}>
        <h3>
          <MdLocationOn className={classes.icon} />
        </h3>
        <h3>
          {activity.city}, {activity.venue}
        </h3>
      </div>
    </div>
  );
};

export default ActivityDetailInfo;
