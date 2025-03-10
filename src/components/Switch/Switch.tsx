import type {SwitchProps} from 'react-native';
import {Switch} from 'react-native';
import {useTheme} from 'styled-components/native';

interface ISwitchProps extends SwitchProps {}
const NewSwitch = (otherProps: ISwitchProps) => {
  const {colors} = useTheme();
  return (
    <Switch
      {...otherProps}
      trackColor={{
        true: colors.pink,
        false: colors.placeholderBg,
      }}
      thumbColor={colors.light}
    />
  );
};
export default NewSwitch;
