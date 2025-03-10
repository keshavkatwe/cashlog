import type {ITextInputBoxProps} from './TextInputBox';
import TextInputBox from './TextInputBox';
import type {Control, FieldValues, Path} from 'react-hook-form';
import {useController} from 'react-hook-form';
import type {FieldPathValue} from 'react-hook-form/dist/types';

interface ITextInputFormBoxProps<T extends FieldValues>
  extends ITextInputBoxProps {
  name: Path<T>;
  control?: Control<T>;
}
const TextInputFormBox = <T extends FieldValues>({
  name,
  control,
  ...otherProps
}: ITextInputFormBoxProps<T>) => {
  const {field} = useController({name, control});
  return (
    <TextInputBox
      {...otherProps}
      value={field.value}
      onBlur={field.onBlur}
      onChangeText={text =>
        field.onChange(text as FieldPathValue<FieldValues, string>)
      }
    />
  );
};
export default TextInputFormBox;
