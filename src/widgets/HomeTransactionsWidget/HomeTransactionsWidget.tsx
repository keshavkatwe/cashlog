import {Box, Divider, Empty, SectionHeader} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {TransactionItem} from '../../components/TransactionItem';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../store';
import {categoryIcon} from '../../constants/category';
import {TouchableOpacity} from 'react-native';
import type {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';
import {formatTransactionDate} from '../../helpers/dateFormatter';
import {setTransactionFilters} from '../../store/slices/transactionFilterSlice';
import {formatAmount} from '../../helpers/amountFormatter';

const HomeTransactionsWidget = () => {
  const {transactions} = useAppSelector(state => state.transactions);
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const dispatch = useAppDispatch();
  return (
    <Box ph={DEFAULT_CONTAINER_PADDING}>
      <SectionHeader
        title={'Recent transactions'}
        actionLabel={'Show all'}
        onAction={() => {
          dispatch(
            setTransactionFilters({
              dateRange: 'CURRENT_MONTH',
              categories: {},
            }),
          );
          return navigation.navigate('Transactions');
        }}
      />
      <Box pt={'12px'}>
        {transactions.map(value => (
          <Box key={value.transactionId}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Transaction', {
                  transaction: value,
                });
              }}>
              <Box pv={'12px'}>
                <TransactionItem
                  icon={categoryIcon[value.category.code]}
                  preTitle={formatTransactionDate(value.dateTime)}
                  displayName={value.merchantName}
                  amount={formatAmount(value.amount, value.currency.code)}
                />
              </Box>
            </TouchableOpacity>
            <Divider />
          </Box>
        ))}
        {transactions.length === 0 && <Empty />}
      </Box>
    </Box>
  );
};
export default HomeTransactionsWidget;
