import {Box} from '../Box';
import {Typography} from '../Typography';
import {
  StyledCardContainer,
  StyledImage,
  walletCardStyle,
} from './WalletCard.styles';
import type {ImageSourcePropType} from 'react-native';

interface IWalletCardProps {
  name: string;
  icon: ImageSourcePropType;
  totalSpent?: string;
}
const WalletCard = ({name, icon, totalSpent}: IWalletCardProps) => (
  <StyledCardContainer
    source={require('../../assets/images/walletCard.png')}
    imageStyle={walletCardStyle.container}>
    <Box ph={'12px'} flex={1} flexDir={'row'} alignItems={'center'}>
      <StyledImage source={icon} />
      <Box flex={1} pl={'4px'}>
        <Typography variant={'lead'}>{name}</Typography>
      </Box>
      <Box alignItems={'flex-end'}>
        <Typography variant={'tiny'} color={'purpleLighter'}>
          This month spent
        </Typography>
        <Typography variant={'h6'}>{totalSpent}</Typography>
      </Box>
    </Box>
  </StyledCardContainer>
);
export default WalletCard;
