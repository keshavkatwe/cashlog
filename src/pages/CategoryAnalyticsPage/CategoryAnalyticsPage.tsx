import {
  Box,
  Empty,
  MainContainer,
  TransactionItemPH,
  Typography,
} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {usePromise} from '../../hooks/usePromise';
import React, {useCallback, useEffect, useMemo} from 'react';
import {getCategoryWiseAnalyticsApi} from '../../services/categoryService/categoryService';
import {TransactionItem} from '../../components/TransactionItem';
import {useAppDispatch, useAppSelector} from '../../store';
import {categoryColors, categoryIcon} from '../../constants/category';
import type {PieChartData} from 'react-native-svg-charts';
import {StyledEmpty, StyledPie} from './CategoryAnalyticsPage.styles';
import {formatAmount} from '../../helpers/amountFormatter';
import {Modal, ScrollView, TouchableOpacity} from 'react-native';
import {useTransactionFilter} from '../../hooks/useTransactionFilter';
import TransactionFilterWidget from '../../widgets/TransactionFilterWidget/TransactionFilterWidget';
import type {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';
import {setTransactionFilters} from '../../store/slices/transactionFilterSlice';
import {userCurrencyState} from '../../store/slices/userSettingSlice';

const CategoryAnalyticsPage = () => {
  const dispatch = useAppDispatch();
  const userCurrency = useAppSelector(userCurrencyState);
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const {categories} = useAppSelector(state => state.categories);
  const {isShowFilter, setIsShowFilter, dateRangeInput} =
    useTransactionFilter();
  const {trigger, data, isLoading} = usePromise(
    useCallback(
      async () =>
        getCategoryWiseAnalyticsApi({
          fromDate: dateRangeInput.fromDate,
          toDate: dateRangeInput.toDate,
        }),
      [dateRangeInput.fromDate, dateRangeInput.toDate],
    ),
  );

  useEffect(() => {
    trigger();
  }, [trigger]);

  const getCategory = useCallback(
    (categoryId: number) =>
      categories.find(val => val.categoryId === categoryId),
    [categories],
  );

  const pieData = useMemo(
    (): PieChartData[] =>
      data?.analyticsData
        // .filter(value => +value.sumOfTransactionPerCategory > 0)
        .map((value, index) => ({
          value: +value.sumOfTransactionPerCategory,
          svg: {
            fill: categoryColors[
              getCategory(value?.categoryId)?.code || 'OTHER'
            ],
          },
          arc: {
            cornerRadius: 10,
          },
          key: `pie-${index}`,
        })) || [],
    [data?.analyticsData, getCategory],
  );

  const goToTransactionHistory = useCallback(
    (categoryId: number) => {
      dispatch(
        setTransactionFilters({
          dateRange: 'CURRENT_MONTH',
          categories: {
            [categoryId]: true,
          },
        }),
      );
      navigation.navigate('Transactions');
    },
    [dispatch, navigation],
  );

  const sortedList = useMemo(
    () =>
      data?.analyticsData.sort(
        (a, b) =>
          +b.sumOfTransactionPerCategory - +a.sumOfTransactionPerCategory,
      ),
    [data?.analyticsData],
  );

  const placeholderRows = useMemo(() => new Array(3).fill(''), []);

  return (
    <MainContainer>
      <ScrollView>
        <Box ph={DEFAULT_CONTAINER_PADDING}>
          <Box justifyContent={'center'} position={'relative'}>
            {pieData?.length > 0 ? (
              <StyledPie
                data={pieData}
                innerRadius={'95%'}
                outerRadius={'100%'}
              />
            ) : (
              <Box alignItems={'center'}>
                <StyledEmpty height={'250px'} width={'250px'} />
              </Box>
            )}

            <Box position={'absolute'} width={'100%'} alignItems={'center'}>
              <Typography color={'placeholder'}>Total Spent</Typography>
              <Typography variant={'h4'}>
                {formatAmount(data?.totalSumOfTransaction, userCurrency?.code)}
              </Typography>
            </Box>
          </Box>

          <Box pb={'24px'} pt={'50px'}>
            <Typography variant={'h5'}>Your categories</Typography>
          </Box>
          {isLoading &&
            placeholderRows.map((_, index) => (
              <Box pv={'10px'} key={+index}>
                <TransactionItemPH isShowIcon />
              </Box>
            ))}

          {!isLoading &&
            sortedList?.map(categoryItem => (
              <Box pv={'10px'} key={categoryItem.categoryId}>
                <TouchableOpacity
                  onPress={() =>
                    goToTransactionHistory(categoryItem.categoryId)
                  }>
                  <TransactionItem
                    displayName={
                      getCategory(categoryItem.categoryId)?.label || ''
                    }
                    amount={formatAmount(
                      +categoryItem.sumOfTransactionPerCategory,
                      userCurrency?.code,
                    )}
                    icon={
                      categoryIcon[
                        getCategory(categoryItem.categoryId)?.code || 'OTHER'
                      ]
                    }
                    key={categoryItem.categoryId}
                  />
                </TouchableOpacity>
              </Box>
            ))}
          {sortedList?.length === 0 && <Empty message={'No spends'} />}
        </Box>
      </ScrollView>
      <Modal visible={isShowFilter} animationType={'slide'} transparent>
        <TransactionFilterWidget onClose={() => setIsShowFilter(false)} />
      </Modal>
    </MainContainer>
  );
};
export default CategoryAnalyticsPage;
