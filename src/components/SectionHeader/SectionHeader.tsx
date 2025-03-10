import {Box} from '../Box';
import {Typography} from '../Typography';
import {TouchableOpacity} from 'react-native';

interface ISectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}
const SectionHeader = ({title, actionLabel, onAction}: ISectionHeaderProps) => (
  <Box flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
    <Typography variant={'h5'}>{title}</Typography>
    {actionLabel && (
      <TouchableOpacity onPress={() => onAction?.()}>
        <Typography variant={'h6'} color={'purpleLighter'}>
          {actionLabel}
        </Typography>
      </TouchableOpacity>
    )}
  </Box>
);
export default SectionHeader;
