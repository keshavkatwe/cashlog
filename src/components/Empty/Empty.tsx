import {Box} from '../Box';
import {Typography} from '../Typography';
import {StyledLottie} from './Empty.styles';

interface EmptyProps {
  message?: string;
}
const Empty = ({message = 'No Transactions'}: EmptyProps) => (
  <Box>
    <Box height={'300px'}>
      <StyledLottie
        source={require('../../assets/lottie/drone.json')}
        autoPlay
        loop
      />
    </Box>
    <Box pt={'20px'}>
      <Typography align={'center'} color={'purpleLightest'}>
        {message}
      </Typography>
    </Box>
  </Box>
);

export default Empty;
