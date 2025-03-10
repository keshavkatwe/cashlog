import type {TouchableOpacityProps} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Plus} from '../../assets/icons';
import {useTheme} from 'styled-components/native';
import {StyledContainer} from './PlusButton.styles';

interface IPlusButtonProps extends TouchableOpacityProps {}
const PlusButton = ({...otherProps}: IPlusButtonProps) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity {...otherProps}>
      <StyledContainer
        start={{x: 0.0, y: 0.2}}
        end={{x: 1.1, y: 0.1}}
        colors={[colors.purpleGradient2, colors.purpleGradient1]}>
        <Plus />
      </StyledContainer>
    </TouchableOpacity>
  );
};

export default PlusButton;
