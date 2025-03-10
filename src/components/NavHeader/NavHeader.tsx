import {StyledBackButton, StyledContainer} from './NavHeader.styles';
import {SafeAreaView} from 'react-native';
import type {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {getHeaderTitle} from '@react-navigation/elements';
import {LineArrowLeft} from '../../assets/icons';
import {Box} from '../Box';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';

interface INavHeaderProps extends NativeStackHeaderProps {}
const NavHeader = ({options, navigation, back}: INavHeaderProps) => {
  const title = getHeaderTitle(options, '');
  return (
    <SafeAreaView>
      <StyledContainer alignItems={'center'} flexDir={'row'}>
        {back && (
          <StyledBackButton onPress={navigation.goBack}>
            <LineArrowLeft />
          </StyledBackButton>
        )}
        <Box flex={1}>
          {typeof options?.headerTitle !== 'string' &&
            options?.headerTitle?.({children: title})}
        </Box>
        <Box pr={DEFAULT_CONTAINER_PADDING}>
          {options?.headerRight?.({canGoBack: !!back})}
        </Box>
      </StyledContainer>
    </SafeAreaView>
  );
};
export default NavHeader;
