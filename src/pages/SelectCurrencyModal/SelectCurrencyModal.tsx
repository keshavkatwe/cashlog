import {
  BottomSheet,
  BottomSheetHeader,
  Box,
  CurrencyRow,
} from '../../components';
import type {NavigationProp, RouteProp} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import lineArrowLeft from '../../assets/icons/lineArrowLeft.svg';
import {SvgXml} from 'react-native-svg';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {useAppSelector} from '../../store';
import {currencyFlag} from '../../constants/currency';
import {useCallback} from 'react';
import type IRootStackParamList from '../../types/IRootStackParamList';

const SelectCurrencyModal = () => {
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const {currencies} = useAppSelector(state => state.currencies);
  const {params} = useRoute<RouteProp<IRootStackParamList, 'SelectCurrency'>>();

  const onCurrencyPress = useCallback(
    (currencyId: number) => {
      const backNavigate = params.backNavigate;
      // @ts-ignore
      navigation.navigate(backNavigate, {
        selectedCurrencyId: currencyId,
      });
    },
    [navigation, params.backNavigate],
  );

  return (
    <BottomSheet onOverlayTap={() => navigation.goBack()}>
      <BottomSheetHeader
        title={'Select currency'}
        leftElement={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgXml xml={lineArrowLeft} />
          </TouchableOpacity>
        }
      />
      <Box ph={DEFAULT_CONTAINER_PADDING} pt={'10px'} pb={'10px'}>
        {currencies.map(item => (
          <Box pv={'10px'} key={item.code}>
            <TouchableOpacity onPress={() => onCurrencyPress(item.currencyId)}>
              <CurrencyRow
                key={item.code}
                icon={currencyFlag[item.code]}
                label={item.label}
                countryName={item.countryLabel}
              />
            </TouchableOpacity>
          </Box>
        ))}
      </Box>
    </BottomSheet>
  );
};
export default SelectCurrencyModal;
