import { useField } from 'formik';
import classes from './MySelectInput.module.css';
import Select from 'react-select';

type Props = {
  children?: React.ReactNode;
  placeholder: string;
  name: string;
  options: any;
  label?: string;
};

const MySelectInput: React.FC<Props> = (props: Props) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <>
      {meta.touched && !!meta.error ? (
        <div className={classes.selectInputField}>
          <label>{props.label}</label>
          <Select
            className={`${classes.error} ${classes.select}`}
            options={props.options}
            value={field.value || null}
            onChange={(d) => helpers.setValue(d.value)}
            isClearable={true}
            placeholder={'Select Activity'}
          />
          {meta.touched && meta.error ? (
            <label className={classes.labelError}>{meta.error}</label>
          ) : null}
        </div>
      ) : (
        <div className={classes.selectInputField}>
          <label>{props.label}</label>
          <Select
            className={classes.select}
            options={props.options}
            value={field.value || null}
            onChange={(d) => helpers.setValue(d.value)}
            isClearable={true}
            isSearchable={true}
            placeholder={
              field.value.charAt(0).toUpperCase() + field.value.slice(1) ||
              'Select Activity'
            }
            onBlur={() => helpers.setTouched(true)}
          />
          {meta.touched && meta.error ? <label>{meta.error}</label> : null}
        </div>
      )}
    </>
  );
};

export default MySelectInput;

{
  /* <>
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
</> */
}
