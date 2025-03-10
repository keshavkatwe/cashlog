import styled from 'styled-components/native';
import {Box} from '../Box';
import {PlatformPressable} from '@react-navigation/elements';

export const StyledContainer = styled(Box)`
  height: 65px;
  margin-bottom: 10px;
`;

export const StyledBackButton = styled(PlatformPressable)`
  padding: 20px;
`;
