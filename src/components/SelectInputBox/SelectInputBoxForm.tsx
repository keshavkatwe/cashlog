import type {ISelectInputBoxProps} from './SelectInputBox';
import SelectInputBox from './SelectInputBox';
import type {Control, FieldValues, Path, PathValue} from 'react-hook-form';
import {useController} from 'react-hook-form';

interface ISelectInputBoxFormProps<T, FV extends FieldValues>
  extends ISelectInputBoxProps<T> {
  name: Path<FV>;
  control?: Control<FV>;
}
const SelectInputBoxForm = <T extends unknown, FV extends FieldValues>({
  name,
  control,
  ...otherProps
}: ISelectInputBoxFormProps<T, FV>) => {
  const {field} = useController({
    name,
    control,
  });
  return (
    <SelectInputBox
      {...otherProps}
      selectedValue={field.value}
      onSelect={val => field.onChange(val as PathValue<FV, Path<FV>>)}
    />
  );
};
export default SelectInputBoxForm;
