import {BiCommentCheck} from 'react-icons/bi'
import classes from './ActivityDetailChat.module.css';
import user from '../../../../assets/user.png';

const comments = [
  {
    image: user,
    name: 'Matt',
    time: 'Today at 5:42PM',
    content: 'How artistic!',
  },
  {
    image: user,
    name: 'Joe Henderson',
    time: '5 days ago',
    content: 'Dude, this is awesome. Thanks so much',
  },
];

const ActivityDetailChat = () => {
  return (
    <div className={classes.activityDetailChatContainer}>
      <div className={classes.activityDetailInfoHeader}>
        <h3>Chat about this event</h3>
      </div>
      <div className={classes.activityDetailInfoMessages}>
        {comments.map((comment,index) => (
          <div key={index} className={classes.userMessage}>
            <img src={comment.image} alt='user' />
            <div className={classes.userMessageInfo}>
              <h3>
                {comment.name}
                <span className={classes.dateInfo}>{comment.time}</span>
              </h3>
              <p>{comment.content}</p>
              <button>Replay</button>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.activityDetailInfoMessageBox}>
        <textarea className={classes.messageInput}/>
        <button><BiCommentCheck className={classes.icon}/> Add replay</button>
      </div>
    </div>
  );
};

export default ActivityDetailChat;
