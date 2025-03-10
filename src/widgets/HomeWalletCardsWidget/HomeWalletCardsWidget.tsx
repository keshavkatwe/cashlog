import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {Box, SectionHeader, WalletCard} from '../../components';
import {FlatList, TouchableOpacity} from 'react-native';
import {useAppSelector} from '../../store';
import type {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';
import SelectWalletTypeWidget from '../SelectWalletTypeWidget/SelectWalletTypeWidget';
import {useState} from 'react';
import {walletTypeIcon} from '../../constants/wallet';
import {formatAmount} from '../../helpers/amountFormatter';
import {userCurrencyState} from '../../store/slices/userSettingSlice';

const HomeWalletCardsWidget = () => {
  const userCurrency = useAppSelector(userCurrencyState);
  const {wallets} = useAppSelector(state => state.wallets);
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const [isShowWalletType, setIsShowWalletType] = useState(false);
  const {wallet: walletAggregation} = useAppSelector(
    state => state.aggregation,
  );

  return (
    <>
      <Box ph={DEFAULT_CONTAINER_PADDING} pt={'26px'}>
        <SectionHeader
          title={'Your wallet'}
          actionLabel={'Add'}
          onAction={() => setIsShowWalletType(true)}
        />
      </Box>
      <Box flexDir={'row'} pt={'24px'}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={wallets}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ManageWallet', {
                  wallet: item,
                });
              }}>
              <Box
                pr={DEFAULT_CONTAINER_PADDING}
                pl={index === 0 ? DEFAULT_CONTAINER_PADDING : '0'}>
                <WalletCard
                  name={item.accountName}
                  totalSpent={formatAmount(
                    walletAggregation?.[item.walletId]?.sum,
                    userCurrency?.code,
                  )}
                  icon={walletTypeIcon[item?.walletType?.code || 'BASE_WALLET']}
                />
              </Box>
            </TouchableOpacity>
          )}
        />
      </Box>

      <SelectWalletTypeWidget
        onClose={() => setIsShowWalletType(false)}
        onWalletTypeSelected={walletTypeId => {
          setIsShowWalletType(false);
          navigation.navigate('ManageWallet', {
            walletTypeId,
          });
        }}
        isShow={isShowWalletType}
      />
    </>
  );
};
export default HomeWalletCardsWidget;
