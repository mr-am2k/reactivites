import { useField } from 'formik';
import classes from './MyTextArea.module.css';

type Props = {
  children?: React.ReactNode;
  placeholder: string;
  name: string;
  rows: number;
  label?: string;
};

const MyTextArea: React.FC<Props> = (props: Props) => {
  const [field, meta] = useField(props.name);
  return (
    <>
      {meta.touched && !!meta.error ? (
        <div className={classes.textareaField}>
          <label>{props.label}</label>
          <textarea className={classes.error} {...field} {...props} />
          {meta.touched && meta.error ? (
            <label className={classes.labelError}>{meta.error}</label>
          ) : null}
        </div>
      ) : (
        <div className={classes.textareaField}>
          <label>{props.label}</label>
          <textarea {...field} {...props} />
          {meta.touched && meta.error ? <label>{meta.error}</label> : null}
        </div>
      )}
    </>
  );
};

export default MyTextArea;
