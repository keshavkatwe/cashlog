import {Box} from '../Box';
import {Typography} from '../Typography';
import {TouchableOpacity} from 'react-native';
import {Divider} from '../Divider';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import type {ReactElement} from 'react';
import {Loader} from '../Loader';

interface IBottomSheetHeaderProps {
  title: string;
  onCancel?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  leftElement?: ReactElement;
  isLoading?: boolean;
}
const BottomSheetHeader = ({
  onCancel,
  title,
  onAction,
  actionLabel,
  leftElement,
  isLoading,
}: IBottomSheetHeaderProps) => (
  <>
    <Box
      pv={'15px'}
      ph={DEFAULT_CONTAINER_PADDING}
      flexDir={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Box width={'60px'}>
        {leftElement ? (
          leftElement
        ) : (
          <TouchableOpacity onPress={onCancel}>
            <Typography>Cancel</Typography>
          </TouchableOpacity>
        )}
      </Box>
      <Box>
        <Typography variant={'h5'}>{title}</Typography>
      </Box>
      <Box width={'60px'} alignItems={'flex-end'}>
        {isLoading ? (
          <Loader />
        ) : (
          <TouchableOpacity onPress={onAction}>
            <Typography variant={'h6'} color={'pink'}>
              {actionLabel}
            </Typography>
          </TouchableOpacity>
        )}
      </Box>
    </Box>
    <Divider />
  </>
);
export default BottomSheetHeader;
