import classes from './ValidationErrors.module.css';

type Props = {
  children?: React.ReactNode;
  errors: string[];
};

const ValidationErrors: React.FC<Props> = ({ errors }) => {
  return (
    <div className={classes.validationErrorContainer}>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default ValidationErrors;
