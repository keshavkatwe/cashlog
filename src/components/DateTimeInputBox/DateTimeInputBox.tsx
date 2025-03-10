import type {IPickerInputBoxProps} from '../PickerInputBox';
import PickerInputBox from '../PickerInputBox/PickerInputBox';
import DatePicker from 'react-native-date-picker';
import {useState} from 'react';
import dayjs from 'dayjs';

export interface IDateTimeInputBoxProps
  extends Omit<IPickerInputBoxProps, 'onClick'> {
  value: Date;
  onChange?: (val: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
  dateFormat?: string;
}
const DateTimeInputBox = ({
  value,
  onChange,
  mode,
  dateFormat,
  ...otherProps
}: IDateTimeInputBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PickerInputBox
        {...otherProps}
        onClick={() => setIsOpen(true)}
        displayValue={dayjs(value).format(dateFormat)}
      />
      <DatePicker
        modal
        open={isOpen}
        date={value}
        onConfirm={date => {
          setIsOpen(false);
          onChange?.(date);
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
        mode={mode}
        maximumDate={new Date()}
      />
    </>
  );
};

export default DateTimeInputBox;
