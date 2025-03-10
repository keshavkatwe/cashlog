import styled from 'styled-components/native';
import {PieChart} from 'react-native-svg-charts';
import {Box} from '../../components';

export const StyledPie = styled(PieChart)`
  height: 250px;
`;

export const StyledEmpty = styled(Box)`
  border-width: 6px;
  border-color: ${props => props.theme.colors.placeholderBg};
  border-radius: 999px;
`;
