import {Box} from '../Box';
import {SvgXml} from 'react-native-svg';
import checkboxOn from '../../assets/icons/checkbox-on.svg';
import checkboxOff from '../../assets/icons/checkbox-off.svg';
import type {PropsWithChildren} from 'react';
import {TouchableOpacity} from 'react-native';

interface ICheckboxProps {
  isChecked?: boolean;
  onChange?: (status: boolean) => void;
}
const Checkbox = ({
  isChecked,
  children,
  onChange,
}: PropsWithChildren<ICheckboxProps>) => (
  <TouchableOpacity onPress={() => onChange?.(!isChecked)}>
    <Box flexDir={'row'}>
      <Box mr={'20px'} mt={'6px'}>
        {isChecked ? <SvgXml xml={checkboxOn} /> : <SvgXml xml={checkboxOff} />}
      </Box>
      <Box flex={1}>{children}</Box>
    </Box>
  </TouchableOpacity>
);
export default Checkbox;
