import {Box} from '../Box';
import {Grid, XAxis, YAxis} from 'react-native-svg-charts';
import {curveNatural} from 'd3-shape';
import {useTheme} from 'styled-components/native';
import {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';
import {useCallback} from 'react';
import {StyledLineChart} from './TransactionGraph.styles';

interface TransactionGraphProps {
  periodData: {
    amount: string;
    dateTime: string;
  }[];
}
const TransactionGraph = ({periodData}: TransactionGraphProps) => {
  const {colors} = useTheme();
  const contentInset = {top: 20, bottom: 20};

  const Decorator = ({x, y, data}: any) =>
    data.map((value: null, index: number) => (
      <Circle key={index} cx={x(index)} cy={y(value)} r={6} fill={'white'} />
    ));

  const Gradient = useCallback(
    () => (
      <>
        <Defs key={'gradient'}>
          <LinearGradient
            id={'gradient'}
            x1="277.255"
            y1="126.146"
            x2="310.099"
            y2="-12.0833"
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#DA90FF" />
            <Stop offset="1" stopColor="#5CCFFF" />
          </LinearGradient>
        </Defs>
        <Defs>
          <LinearGradient
            id="paint0_linear_616_1372"
            x1="344.771"
            y1="154"
            x2="344.771"
            y2="38.6087"
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#1A1C39" stopOpacity="0.01" />
            <Stop offset="1" stopColor="#2989FF" stopOpacity="0.456157" />
          </LinearGradient>
        </Defs>
      </>
    ),
    [],
  );

  return (
    <>
      <Box flexDir={'row'} height={'200px'}>
        <YAxis
          data={periodData.map(value => +value.amount) || []}
          svg={{
            fill: colors.purpleLight,
            fontSize: 14,
            fontWeight: '400',
          }}
          numberOfTicks={5}
          contentInset={contentInset}
        />
        <StyledLineChart
          data={periodData.map(value => +value.amount) || []}
          svg={{
            stroke: 'url(#gradient)',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            fill: 'url(#paint0_linear_616_1372)',
          }}
          curve={curveNatural}
          contentInset={{
            ...contentInset,
            left: 10,
            right: 10,
          }}>
          <Grid svg={{stroke: '#6C6CF44D'}} belowChart={false} />
          <Decorator />
          <Gradient />
        </StyledLineChart>
      </Box>
      <XAxis
        data={periodData || []}
        formatLabel={(_, index) => periodData?.[index]?.dateTime || ''}
        contentInset={{left: 40, right: 20}}
        svg={{fontSize: 14, fontWeight: '400', fill: colors.purpleLight}}
      />
    </>
  );
};

export default TransactionGraph;
