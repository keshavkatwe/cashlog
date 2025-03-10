import {DateTimeInputBox} from './index';
import type {IDateTimeInputBoxProps} from './DateTimeInputBox';
import type {Control, FieldPathValue, FieldValues, Path} from 'react-hook-form';
import {useController} from 'react-hook-form';

interface IDateTimeInputFormBoxProps<T extends FieldValues>
  extends Omit<IDateTimeInputBoxProps, 'value'> {
  name: Path<T>;
  control: Control<T>;
}
const DateTimeInputFormBox = <T extends FieldValues>({
  name,
  control,
  ...otherProps
}: IDateTimeInputFormBoxProps<T>) => {
  const {field} = useController({
    name,
    control,
  });
  return (
    <>
      <DateTimeInputBox
        {...otherProps}
        value={field.value}
        onChange={val =>
          field.onChange(val as FieldPathValue<FieldValues, string>)
        }
      />
    </>
  );
};
export default DateTimeInputFormBox;
