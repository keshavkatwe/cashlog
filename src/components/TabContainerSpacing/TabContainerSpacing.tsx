import {StyledContainer} from './TabContainerSpacing.styles';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const TabContainerSpacing = () => {
  const height = useBottomTabBarHeight();
  return <StyledContainer height={`${height}px`} />;
};
export default TabContainerSpacing;
