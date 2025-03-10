import type {Control, FieldValues, Path} from 'react-hook-form';
import {useController} from 'react-hook-form';
import Checkbox from './Checkbox';
import type {FieldPathValue} from 'react-hook-form/dist/types';
import type {PropsWithChildren} from 'react';

interface ICheckboxFormProps<T extends FieldValues> {
  name: Path<T>;
  control?: Control<T>;
}
const CheckboxForm = <T extends FieldValues>({
  name,
  control,
  ...otherProps
}: PropsWithChildren<ICheckboxFormProps<T>>) => {
  const {field} = useController({name, control});
  return (
    <Checkbox
      isChecked={field.value}
      onChange={status =>
        field.onChange(status as FieldPathValue<FieldValues, string>)
      }
      {...otherProps}
    />
  );
};
export default CheckboxForm;
