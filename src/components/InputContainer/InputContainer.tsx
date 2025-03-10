import type {PropsWithChildren} from 'react';
import {StyledContainer} from './InputContainer.styles';
import {Typography} from '../Typography';
import {Box} from '../Box';

interface IInputContainerProps {
  errorMessage?: string;
}
const InputContainer = ({
  children,
  errorMessage,
}: PropsWithChildren<IInputContainerProps>) => (
  <>
    <StyledContainer br={'br20'} pv={'8px'} ph={'14px'}>
      {children}
    </StyledContainer>
    {errorMessage && (
      <Box pt={'10px'} pl={'16px'}>
        <Typography color={'red'}>{errorMessage}</Typography>
      </Box>
    )}
  </>
);

export default InputContainer;
