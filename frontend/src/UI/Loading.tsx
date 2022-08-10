import classes from './Loading.module.css';

type Props = {
  children?: React.ReactNode;
  content?: string;
};

const Loading: React.FC<Props> = ({ content = 'Loading' }) => {
  return (
    <div className={classes.loadingContainer}>
      <div className={classes.spinner}></div>
      <h3>{content}</h3>
    </div>
  );
};

export default Loading;
