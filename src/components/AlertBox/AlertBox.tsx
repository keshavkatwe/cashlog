import {Box} from '../Box';
import {Typography} from '../Typography';
import {SvgXml} from 'react-native-svg';
import {AlertBoxStyles} from './AlertBox.styles';
import {TouchableWithoutFeedback} from 'react-native';
import type {IAlertType} from '../../plugins/Alert/Alert.types';
import {useMemo} from 'react';
import exclamatoryIcon from '../../assets/icons/Exclaimatry.svg';
import tickRound from '../../assets/icons/tickRound.svg';
import type {DefaultTheme} from 'styled-components/native';

interface IAlertBoxProps {
  title?: string;
  message?: string;
  onTap?: () => void;
  alertType?: IAlertType;
}
const AlertBox = ({
  message,
  title,
  onTap,
  alertType = 'ERROR',
}: IAlertBoxProps) => {
  const properties = useMemo((): {
    bgColor: keyof DefaultTheme['colors'];
    icon: string;
  } => {
    if (alertType === 'SUCCESS') {
      return {
        bgColor: 'purpleLight',
        icon: tickRound,
      };
    }
    return {
      bgColor: 'red',
      icon: exclamatoryIcon,
    };
  }, [alertType]);
  return (
    <TouchableWithoutFeedback onPress={() => onTap?.()}>
      <Box
        bgColor={properties.bgColor}
        p={'16px'}
        br={'br20'}
        flexDir={'row'}
        alignItems={'center'}
        style={AlertBoxStyles.box}>
        <SvgXml height={43} width={43} xml={properties.icon} />
        <Box pl={'16px'} flex={1}>
          <Typography variant={'h6'}>{title}</Typography>
          {message && <Typography>{message}</Typography>}
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  );
};
export default AlertBox;
