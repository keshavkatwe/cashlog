import type {PropsWithChildren} from 'react';
import {useEffect, useMemo, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import HeaderTitle from '../../components/NavHeader/HeaderTitle';
import type {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';
import {useAppSelector} from '../../store';
import {dateRangeLabels, dateRangeValues} from '../../constants/transactions';
import filterIcon from '../../assets/icons/filter.svg';

const useTransactionFilter = () => {
  const {dateRange, categories: categoryFilterList} = useAppSelector(
    state => state.transactionFilter,
  );
  const [isShowFilter, setIsShowFilter] = useState(false);

  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsShowFilter(true)}>
          <SvgXml xml={filterIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props: PropsWithChildren) =>
        HeaderTitle({
          ...props,
          subTitle: dateRangeLabels[dateRange],
        }),
    });
  }, [dateRange, navigation]);

  const dateRangeInput = useMemo(
    () => ({
      fromDate: dateRangeValues[dateRange][0].format('YYYY-MM-DD H:mm:ss'),
      toDate: dateRangeValues[dateRange][1].format('YYYY-MM-DD H:mm:ss'),
    }),
    [dateRange],
  );

  return {isShowFilter, setIsShowFilter, dateRangeInput, categoryFilterList};
};
export default useTransactionFilter;
