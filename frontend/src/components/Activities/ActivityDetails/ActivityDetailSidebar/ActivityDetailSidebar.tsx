import classes from './ActivityDetailSidebar.module.css';
import user from '../../../../assets/user.png';

const attendees = [
  {
    image: user,
    name: 'Bob',
    host: true,
    following: true,
  },
  {
    image: user,
    name: 'Tom',
    host: false,
    following: true,
  },
  {
    image: user,
    name: 'Sally',
    host: false,
    following: false,
  },
];

const ActivityDetailSidebar = () => {
  return (
    <div className={classes.activityDetailSidebarContainer}>
      <div className={classes.activityDetailSidebarHeader}>
        <h3>3 people going</h3>
      </div>
      <div className={classes.activityDetailSidebarAttendees}>
        {attendees.map((attendee, index) => (
          <div key={index} className={classes.attendee}>
            <img src={attendee.image} alt='user' />
            <div className={classes.attendeeInfo}>
              <h2>{attendee.name}</h2>
              {attendee.following && <h5>Following</h5>}
              {attendee.host && <span>Host</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityDetailSidebar;
