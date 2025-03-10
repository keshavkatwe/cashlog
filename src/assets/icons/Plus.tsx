import type {SvgProps} from 'react-native-svg';
import Svg, {Path} from 'react-native-svg';

const Plus = (props: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12.3429 5.76001V18.9257"
      stroke="white"
      strokeWidth="2.56"
      strokeLinecap="round"
      {...props}
    />
    <Path
      d="M18.9257 12.3429H5.76"
      stroke="white"
      strokeWidth="2.56"
      strokeLinecap="round"
      {...props}
    />
  </Svg>
);
export default Plus;
