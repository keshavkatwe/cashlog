import {Box} from '../Box';
import {Typography} from '../Typography';
import {Button} from '../Button';

interface IHomeSpentProps {
  amount: string;
  onAnalyticsPress?: () => void;
}
const HomeSpent = ({amount, onAnalyticsPress}: IHomeSpentProps) => (
  <Box flexDir={'row'} alignItems={'center'}>
    <Box flex={1}>
      <Typography color={'purpleLighter'}>Today’s spent</Typography>
      <Typography variant={'h1'}>{amount}</Typography>
    </Box>
    <Button
      variant={'secondary'}
      size={'tiny'}
      onPress={() => onAnalyticsPress?.()}>
      Analytics
    </Button>
  </Box>
);
export default HomeSpent;
