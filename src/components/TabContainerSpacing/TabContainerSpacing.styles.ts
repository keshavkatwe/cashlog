import styled from 'styled-components/native';
import {Box} from '../Box';

export const StyledContainer = styled(Box)<{height: string}>`
  height: ${prop => prop.height};
`;
