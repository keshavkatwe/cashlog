import {Box, MainContainer, Typography} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import type {RouteProp, NavigationProp} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';
import {formatAmount} from '../../helpers/amountFormatter';
import {SvgXml} from 'react-native-svg';
import {categoryIcon} from '../../constants/category';
import {walletTypeIcon} from '../../constants/wallet';
import {StyledWalletIcon} from './TransactionPage.styles';
import {formatTransactionDate} from '../../helpers/dateFormatter';
import {useAppSelector} from '../../store';
import {useCallback, useEffect} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import {usePromise} from '../../hooks/usePromise';
import {deleteTransactionApi} from '../../services/transactionService/transactionService';
import useStartUp from '../../hooks/useStartUp';

const TransactionPage = () => {
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const {setupInitial} = useStartUp();
  const {params} = useRoute<RouteProp<IRootStackParamList, 'Transaction'>>();
  const transaction = params.transaction;

  const {trigger} = usePromise(
    useCallback(async () => {
      await deleteTransactionApi(transaction?.transactionId);
      await setupInitial();
    }, [transaction?.transactionId, setupInitial]),
    {
      onSuccess: useCallback(() => {
        navigation.goBack();
      }, [navigation]),
    },
  );

  const walletType = useAppSelector(
    state =>
      state.wallets.wallets.find(
        walletItem => walletItem.walletId === transaction.wallet.walletId,
      )?.walletType,
  );

  const onEdit = useCallback(() => {
    navigation.navigate('ManageTransaction', {
      transaction: transaction,
      backNavigate: 'Transaction',
    });
  }, [navigation, transaction]);

  const onDelete = useCallback(() => {
    Alert.alert('Delete transaction', 'Are you sure? This cannot be undone.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: trigger,
      },
    ]);
  }, [trigger]);

  const getHeaderIcons = useCallback(
    () => (
      <Box flexDir={'row'} gap={'20px'}>
        <TouchableOpacity onPress={onEdit}>
          <SvgXml xml={editIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <SvgXml xml={deleteIcon} />
        </TouchableOpacity>
      </Box>
    ),
    [onDelete, onEdit],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: getHeaderIcons,
    });
  }, [getHeaderIcons, navigation]);

  return (
    <MainContainer>
      <Box ph={DEFAULT_CONTAINER_PADDING}>
        <Box alignItems={'center'}>
          <Typography variant={'bodySmall'}>Amount</Typography>
          <Typography variant={'h1'}>
            {formatAmount(transaction.amount, transaction.currency.code)}
          </Typography>
        </Box>

        <Box flexDir={'row'} mt={'50px'}>
          <Box flexDir={'row'} width={'50%'}>
            <SvgXml xml={categoryIcon[transaction.category.code]} />
            <Box ml={'10px'}>
              <Typography variant={'bodySmall'} color={'purpleLightest'}>
                Category
              </Typography>
              <Typography variant={'h6'}>
                {transaction.category.label}
              </Typography>
            </Box>
          </Box>
          <Box flexDir={'row'} width={'50%'}>
            {walletType?.code && (
              <StyledWalletIcon source={walletTypeIcon[walletType?.code]} />
            )}

            <Box ml={'10px'}>
              <Typography variant={'bodySmall'} color={'purpleLightest'}>
                Wallet
              </Typography>
              <Typography variant={'h6'}>
                {transaction.wallet.accountName}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box mt={'30px'} flexDir={'row'}>
          <Box width={'50%'}>
            <Typography variant={'bodySmall'} color={'purpleLightest'}>
              Merchant Name
            </Typography>
            <Typography variant={'h6'}>{transaction.merchantName}</Typography>
          </Box>
          <Box width={'50%'}>
            <Typography variant={'bodySmall'} color={'purpleLightest'}>
              Date & Time
            </Typography>
            <Typography variant={'h6'}>
              {formatTransactionDate(transaction.dateTime)}
            </Typography>
          </Box>
        </Box>

        {transaction.note && (
          <Box mt={'30px'}>
            <Typography variant={'bodySmall'} color={'purpleLightest'}>
              Note
            </Typography>
            <Typography variant={'h6'}>{transaction.note}</Typography>
          </Box>
        )}
      </Box>
    </MainContainer>
  );
};
export default TransactionPage;
