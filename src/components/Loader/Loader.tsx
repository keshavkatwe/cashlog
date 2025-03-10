import {StyledLottie} from './Loader.styles';

const Loader = () => (
  <StyledLottie
    source={require('../../assets/lottie/ballsSpinner.json')}
    autoPlay
    loop
  />
);
export default Loader;
