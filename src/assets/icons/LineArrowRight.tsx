import type {SvgProps} from 'react-native-svg';
import Svg, {Path} from 'react-native-svg';
const LimeArrowRight = (props: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M10.0001 7.11768L14.8825 12L10.0001 16.8534"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    />
  </Svg>
);
export default LimeArrowRight;
