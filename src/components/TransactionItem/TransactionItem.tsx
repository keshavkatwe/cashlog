import {Box} from '../Box';
import {Typography} from '../Typography';
import React from 'react';
import {SvgXml} from 'react-native-svg';

interface ITransactionItemProps {
  preTitle?: string;
  displayName: string;
  amount: string;
  icon?: string;
  note?: string;
}
const TransactionItem = ({
  preTitle,
  displayName,
  amount,
  icon,
  note,
}: ITransactionItemProps) => (
  <Box flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
    {icon && (
      <Box pr={'14px'}>
        <SvgXml xml={icon} />
      </Box>
    )}
    <Box flex={1}>
      {preTitle && (
        <Typography variant={'small'} color={'purpleLightest'}>
          {preTitle}
        </Typography>
      )}
      <Typography variant={'h6'}>{displayName}</Typography>
      {note && (
        <Typography variant={'bodySmall'} color={'grey'}>
          {note}
        </Typography>
      )}
    </Box>
    <Typography variant={'h6'}>{amount}</Typography>
  </Box>
);
export default TransactionItem;
