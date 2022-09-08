import { useField } from 'formik';
import classes from './MyTextInput.module.css';

type Props = {
  children?: React.ReactNode;
  placeholder: string;
  name: string;
  label?: string;
};

const MyTextInput: React.FC<Props> = (props: Props) => {
  const [field, meta] = useField(props.name);
  return (
    <>
      {meta.touched && !!meta.error ? (
        <div className={classes.inputField  }>
          <label>{props.label}</label>
          <input className={classes.error} {...field} {...props} />
          {meta.touched && meta.error ? <label className={classes.labelError}>{meta.error}</label> : null}
        </div>
      ) : (
        <div className={classes.inputField}>
          <label>{props.label}</label>
          <input {...field} {...props} />
          {meta.touched && meta.error ? <label>{meta.error}</label> : null}
        </div>
      )}
    </>
  );
};

export default MyTextInput;
