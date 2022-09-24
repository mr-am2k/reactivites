import { useField } from 'formik';
import classes from './MyDateInput.module.css';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

const MyDateInput: React.FC<Partial<ReactDatePickerProps>> = (
  props: Partial<ReactDatePickerProps>
) => {
  const [field, meta, helpers] = useField(props.name!);
  return (
    <>
      {meta.touched && !!meta.error ? (
        <div className={classes.datePickerField}>
          <DatePicker
            className={`${classes.error} ${classes.datePicker}`}
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={(value) => helpers.setValue(value)}
          />
          {meta.touched && meta.error ? (
            <label className={classes.labelError}>{meta.error}</label>
          ) : null}
        </div>
      ) : (
        <div className={classes.datePickerField}>
          <DatePicker
            className={classes.datePicker}
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={(value) => helpers.setValue(value)}
          />
          {meta.touched && meta.error ? <label>{meta.error}</label> : null}
        </div>
      )}
    </>
  );
};

export default MyDateInput;
