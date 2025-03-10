import {HomeSpent} from '../../components';
import {useAppSelector} from '../../store';
import type {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';
import {formatAmount} from '../../helpers/amountFormatter';
import {userCurrencyState} from '../../store/slices/userSettingSlice';

const HomeSpentWidget = () => {
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const userCurrency = useAppSelector(userCurrencyState);
  const {todaySpent} = useAppSelector(state => state.aggregation);
  return (
    <HomeSpent
      amount={formatAmount(todaySpent, userCurrency?.code)}
      onAnalyticsPress={() => {
        navigation.navigate('CategoryAnalytics');
      }}
    />
  );
};
export default HomeSpentWidget;
