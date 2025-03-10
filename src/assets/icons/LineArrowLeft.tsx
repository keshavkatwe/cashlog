import type {SvgProps} from 'react-native-svg';
import Svg, {Path} from 'react-native-svg';
const LineArrowLeft = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none">
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.56}
      d="M17 8.541 11.14 14.4 17 20.224"
      {...props}
    />
  </Svg>
);
export default LineArrowLeft;
