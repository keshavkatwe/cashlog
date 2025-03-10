import styled, {css} from 'styled-components/native';
import {Box} from '../Box';

export const StyledBox = styled(Box)<{isActive: boolean}>`
  border: 1px solid ${props => props.theme.colors.placeholder};

  ${props =>
    props.isActive &&
    css`
      border-color: ${props.theme.colors.purpleLighter};
      background-color: ${props.theme.colors.purpleLighter}50;
    `}
`;
