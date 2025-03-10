import {useTheme} from 'styled-components/native';
import {
  StyledGradientContainer,
  StyledKeyboardContainer,
  StyledMainContainer,
} from './MainContainer.styles';
import type {PropsWithChildren} from 'react';
import {useHeaderHeight} from '@react-navigation/elements';

const MainContainer = ({children}: PropsWithChildren) => {
  const {colors} = useTheme();
  const height = useHeaderHeight();
  return (
    <StyledGradientContainer
      headerHeight={`${height}px`}
      colors={[colors.backgroundGradient1, colors.backgroundGradient2]}>
      <StyledMainContainer>
        <StyledKeyboardContainer
          behavior={'padding'}
          keyboardVerticalOffset={height}>
          {children}
        </StyledKeyboardContainer>
      </StyledMainContainer>
    </StyledGradientContainer>
  );
};

export default MainContainer;
