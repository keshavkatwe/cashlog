import {Box} from '../Box';
import {Typography} from '../Typography';
import {SvgXml} from 'react-native-svg';

interface ICurrencyRowProps {
  label: string;
  countryName: string;
  icon?: string;
}
const CurrencyRow = ({label, countryName, icon}: ICurrencyRowProps) => (
  <Box flexDir={'row'} alignItems={'center'}>
    {icon && <SvgXml xml={icon} />}
    <Box pl={'14px'}>
      <Typography>{countryName}</Typography>
      <Typography color={'grey'}>{label}</Typography>
    </Box>
  </Box>
);
export default CurrencyRow;
