import {
  Box,
  Divider,
  Empty,
  MainContainer,
  TransactionGraph,
  TransactionItemPH,
  Typography,
} from '../../components';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {usePromise} from '../../hooks/usePromise';
import {getTransactionsApi} from '../../services/transactionService/transactionService';
import {useTransactionFilter} from '../../hooks/useTransactionFilter';
import {formatAmount} from '../../helpers/amountFormatter';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import type ITransaction from '../../types/ITransaction';
import {Modal, SectionList, TouchableOpacity} from 'react-native';
import {TransactionItem} from '../../components/TransactionItem';
import {getFormattedDisplayDate} from './TransactionsPage.utils';
import TransactionFilterWidget from '../../widgets/TransactionFilterWidget/TransactionFilterWidget';
import FilterListWidget from '../../widgets/FilterListWidget/FilterListWidget';
import {useAppSelector} from '../../store';
import type {IGetTransactionRequestDto} from '../../services/transactionService/dto/getTransaction.dto';
import {userCurrencyState} from '../../store/slices/userSettingSlice';
import graphEmptyIcon from '../../assets/icons/emptyGraphTransaction.svg';
import {SvgXml} from 'react-native-svg';
import type {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';

const PAGE_LIMIT = 10;

const TransactionsPage = () => {
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const userCurrency = useAppSelector(userCurrencyState);
  const {dateRangeInput, setIsShowFilter, isShowFilter, categoryFilterList} =
    useTransactionFilter();
  const [pageNo, setPageNo] = useState(0);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [transactionList, setTransactionList] = useState<ITransaction[]>([]);
  const categories = useAppSelector(state => state.categories.categories);
  const [localDateFilters, setLocalDateFilters] = useState({
    fromDate: dateRangeInput.fromDate,
    toDate: dateRangeInput.toDate,
  });

  const [localCategoriesMap, setLocalCategoriesMap] =
    useState(categoryFilterList);

  const {
    trigger: getTransactions,
    data: transactionData,
    isLoading,
  } = usePromise(
    useCallback(async () => {
      const requestPayload: IGetTransactionRequestDto = {
        fromDate: localDateFilters.fromDate,
        toDate: localDateFilters.toDate,
        take: PAGE_LIMIT,
        skip: pageNo * PAGE_LIMIT,
        isGiveGraph: pageNo === 0,
        isGiveTotalSpent: pageNo === 0,
      };

      const categoryIds = (
        Object.keys(localCategoriesMap) as unknown as number[]
      )
        .map(value => ({
          key: value,
          value: localCategoriesMap[value],
        }))
        .filter(value => !!value.value)
        .map(value => value.key)
        .join(',');

      if (categoryIds) {
        requestPayload.categoryIds = categoryIds;
      }

      const transactions = await getTransactionsApi(requestPayload);

      setTransactionList(prevState => [
        ...prevState,
        ...transactions.transactions,
      ]);
      if (transactions.transactions.length < PAGE_LIMIT) {
        setReachedEnd(true);
      }

      return transactions;
    }, [
      localCategoriesMap,
      localDateFilters.fromDate,
      localDateFilters.toDate,
      pageNo,
    ]),
  );

  const transactionGroups = useMemo(() => {
    const listMap: Record<string, ITransaction[]> = {};
    transactionList.forEach(transactionItem => {
      const groupName = getFormattedDisplayDate(transactionItem.dateTime);
      listMap[groupName] = listMap[groupName] || [];
      listMap[groupName].push(transactionItem);
    });

    return Object.keys(listMap).map(value => ({
      title: value,
      data: listMap[value] as unknown as ITransaction[],
    }));
  }, [transactionList]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const resetPaging = useCallback(() => {
    setTransactionList([]);
    setPageNo(0);
    setReachedEnd(false);
  }, []);

  useEffect(() => {
    resetPaging();
    setLocalDateFilters({
      fromDate: dateRangeInput.fromDate,
      toDate: dateRangeInput.toDate,
    });
    setLocalCategoriesMap(categoryFilterList);
  }, [
    categoryFilterList,
    dateRangeInput.fromDate,
    dateRangeInput.toDate,
    resetPaging,
  ]);

  const filterCategoryList = useMemo(
    () =>
      categories
        .filter(item => categoryFilterList[item.categoryId])
        .map(item => ({
          categoryLabel: item.label,
          categoryId: item.categoryId,
        })),
    [categories, categoryFilterList],
  );

  const renderGraph = useCallback(
    () => (
      <>
        {filterCategoryList.length > 0 && (
          <Box pb={'20px'}>
            <FilterListWidget items={filterCategoryList} />
          </Box>
        )}
        <Box ph={DEFAULT_CONTAINER_PADDING}>
          <Typography color={'grey'}>Total spent</Typography>
          <Typography variant={'h1'}>
            {formatAmount(
              transactionData?.sumOfTransaction,
              userCurrency?.code,
            )}
          </Typography>
        </Box>
        <Box ph={DEFAULT_CONTAINER_PADDING}>
          {transactionData?.graphData?.periodData?.length &&
          transactionData?.graphData?.periodData?.length > 0 ? (
            <TransactionGraph
              periodData={transactionData?.graphData?.periodData || []}
            />
          ) : (
            <SvgXml color={'red'} xml={graphEmptyIcon} />
          )}
        </Box>
        <Box ph={DEFAULT_CONTAINER_PADDING} pt={'40px'} pb={'12px'}>
          <Typography variant={'h5'}>Transactions</Typography>
        </Box>
      </>
    ),
    [
      filterCategoryList,
      userCurrency?.code,
      transactionData?.graphData?.periodData,
      transactionData?.sumOfTransaction,
    ],
  );

  const renderDivider = useCallback((props: {leadingItem: boolean}) => {
    if (props.leadingItem) {
      return (
        <Box pv={'10px'}>
          <Divider />
        </Box>
      );
    }
    return null;
  }, []);

  const viewTransaction = useCallback(
    (transaction: ITransaction) => {
      navigation.navigate('Transaction', {
        transaction,
      });
    },
    [navigation],
  );

  const placeholderRows = useMemo(() => new Array(3).fill(''), []);

  return (
    <MainContainer>
      <SectionList
        onScrollEndDrag={() => {
          if (!isLoading && !reachedEnd) {
            setPageNo(prevState => prevState + 1);
          }
        }}
        ListHeaderComponent={renderGraph}
        keyExtractor={item => item.transactionId + ''}
        sections={transactionGroups}
        renderSectionHeader={info => (
          <Box ph={DEFAULT_CONTAINER_PADDING} pb={'12px'}>
            <Typography variant={'h6'} color={'purpleLightest'}>
              {info.section.title}
            </Typography>
          </Box>
        )}
        renderItem={({item}) => (
          <Box ph={DEFAULT_CONTAINER_PADDING} pv={'8px'}>
            <TouchableOpacity onPress={() => viewTransaction(item)}>
              <TransactionItem
                preTitle={item.category.label}
                displayName={item.merchantName}
                amount={formatAmount(item.amount, item?.currency?.code)}
                note={item.note}
              />
            </TouchableOpacity>
          </Box>
        )}
        ListEmptyComponent={
          <Box ph={DEFAULT_CONTAINER_PADDING}>
            {isLoading ? (
              placeholderRows.map((_, index) => (
                <Box pv={'10px'} key={+index}>
                  <TransactionItemPH isShowPostTitle />
                </Box>
              ))
            ) : (
              <Empty />
            )}
          </Box>
        }
        SectionSeparatorComponent={renderDivider}
      />
      <Modal visible={isShowFilter} animationType={'slide'} transparent>
        <TransactionFilterWidget
          isShowCategoryFilters
          onClose={() => setIsShowFilter(false)}
        />
      </Modal>
    </MainContainer>
  );
};

export default TransactionsPage;
