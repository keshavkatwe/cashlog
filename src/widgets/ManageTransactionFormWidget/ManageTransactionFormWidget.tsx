import {
  BottomSheetHeader,
  Box,
  DateTimeInputFormBox,
  InputContainer,
  SelectInputBoxForm,
  TextInputFormBox,
  Typography,
} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {StyledInput} from './ManageTransactionFormWidget.styles';
import {CalenderOutline, EditOutline} from '../../assets/icons';
import type {NavigationProp, RouteProp} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../store';
import type {Control} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import type {ManageTransactionFormWidgetFormState} from './ManageTransactionFormWidget.types';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {categoryIcon} from '../../constants/category';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  getTransactionApi,
  saveTransaction,
  updateTransaction,
} from '../../services/transactionService/transactionService';
import {
  addTransaction,
  updateTransactionState,
} from '../../store/slices/transactionsSlice';
import type ITransaction from '../../types/ITransaction';
import {LocalSvg} from 'react-native-svg';
import useStartUp from '../../hooks/useStartUp';
import {userCurrencyState} from '../../store/slices/userSettingSlice';
import {Alert, TouchableOpacity} from 'react-native';
import type IRootStackParamList from '../../types/IRootStackParamList';
import {usePromise} from '../../hooks/usePromise';
import type IApiException from '../../types/IApiException';

const schema: yup.ObjectSchema<ManageTransactionFormWidgetFormState> =
  yup.object({
    amount: yup.string().required(),
    categoryId: yup.number().required(),
    note: yup.string(),
    transactionDate: yup.date().required(),
    walletId: yup.number().required(),
    merchantName: yup.string().required(),
    currencyId: yup.number().required(),
    transactionId: yup.number(),
  });

interface IManageTransactionFormWidgetProps {
  transaction?: ITransaction;
  backNavigate?: keyof IRootStackParamList;
}
const ManageTransactionFormWidget = ({
  transaction,
  backNavigate,
}: IManageTransactionFormWidgetProps) => {
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const route = useRoute<RouteProp<IRootStackParamList, 'ManageTransaction'>>();
  const userCurrency = useAppSelector(userCurrencyState);
  const currencies = useAppSelector(state => state.currencies.currencies);
  const {categories} = useAppSelector(state => state.categories);
  const {wallets} = useAppSelector(state => state.wallets);
  const [backNavigatePage] = useState(backNavigate);
  const dispatch = useAppDispatch();
  const {updateSpends} = useStartUp();

  const {control, watch, handleSubmit, formState, setValue} =
    useForm<ManageTransactionFormWidgetFormState>({
      defaultValues: {
        amount: transaction?.amount.toString() || '',
        categoryId:
          transaction?.category.categoryId || categories[0].categoryId,
        note: transaction?.note || '',
        transactionDate:
          (transaction?.dateTime && new Date(transaction.dateTime)) ||
          new Date(),
        walletId:
          transaction?.wallet.walletId ||
          (wallets.length && wallets[0].walletId),
        merchantName: transaction?.merchantName,
        currencyId:
          transaction?.currency.currencyId || userCurrency?.currencyId,
        transactionId: transaction?.transactionId,
      },
      resolver: yupResolver(schema),
    });

  const selectedCurrencyId = watch('currencyId');
  const transactionId = watch('transactionId');

  const {trigger: onSubmit, isLoading} = usePromise(
    useCallback(
      async (formValues: ManageTransactionFormWidgetFormState) => {
        const requestPayload = {
          amount: +formValues.amount,
          categoryId: formValues.categoryId,
          currencyId: formValues.currencyId,
          walletId: formValues.walletId,
          dateTime: formValues.transactionDate,
          note: formValues.note,
          merchantName: formValues.merchantName,
        };

        let updatedTransaction: ITransaction;
        if (transactionId) {
          await updateTransaction(transactionId, requestPayload);
          updatedTransaction = await getTransactionApi(transactionId);
          dispatch(updateTransactionState(updatedTransaction));
        } else {
          updatedTransaction = await saveTransaction(requestPayload);
          dispatch(addTransaction(updatedTransaction));
        }

        await updateSpends();

        if (backNavigatePage) {
          // @ts-ignore
          navigation.navigate(backNavigatePage, {
            transaction: updatedTransaction,
          });
        } else {
          navigation.goBack();
        }
      },
      [backNavigatePage, dispatch, navigation, transactionId, updateSpends],
    ),
    {
      onError: useCallback((err?: IApiException) => {
        Alert.alert('Save transaction failed', err?.message);
      }, []),
    },
  );

  const goToCurrencyPicker = useCallback(() => {
    navigation.navigate('SelectCurrency', {
      backNavigate: 'ManageTransaction',
    });
  }, [navigation]);

  const selectedCurrency = useMemo(
    () =>
      currencies.find(
        currencyItem => currencyItem.currencyId === selectedCurrencyId,
      ),
    [currencies, selectedCurrencyId],
  );

  useEffect(() => {
    if (route?.params?.selectedCurrencyId) {
      setValue('currencyId', route?.params?.selectedCurrencyId);
    }
  }, [route?.params?.selectedCurrencyId, setValue]);

  return (
    <Box>
      <BottomSheetHeader
        title={transactionId ? 'Update Transaction' : 'Add Transaction'}
        actionLabel={transactionId ? 'Save' : 'Add'}
        onCancel={() => navigation.goBack()}
        onAction={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />
      <Box pb={DEFAULT_CONTAINER_PADDING}>
        <Box
          ph={DEFAULT_CONTAINER_PADDING}
          flexDir={'row'}
          pt={'20px'}
          alignItems={'flex-end'}>
          <TouchableOpacity onPress={goToCurrencyPicker}>
            <Box bgColor={'purpleLighter'} ph={'13px'} pv={'5px'} br={'br10'}>
              <Typography variant={'bodySmall'}>
                {selectedCurrency?.label}
              </Typography>
            </Box>
          </TouchableOpacity>
          <Box pl={'20px'} flex={1}>
            <Typography variant={'bodySmall'}>Amount</Typography>
            <Box pt={'4px'}>
              <StyledInput
                name={'amount'}
                control={control as unknown as Control}
                placeholder={'0'}
                autoFocus
                keyboardType={'number-pad'}
              />
            </Box>
          </Box>
        </Box>
        <Box pt={'26px'}>
          <Box ph={DEFAULT_CONTAINER_PADDING} pb={'10px'}>
            <Typography variant={'bodySmall'} color={'purpleLightest'}>
              Select category
            </Typography>
          </Box>
          <SelectInputBoxForm
            offsetPadding={DEFAULT_CONTAINER_PADDING}
            control={control}
            name={'categoryId'}
            items={categories?.map(item => ({
              label: item.label,
              value: item.categoryId,
              icon: categoryIcon[item.code],
            }))}
          />
        </Box>
        <Box pt={'26px'}>
          <Box ph={DEFAULT_CONTAINER_PADDING} pb={'10px'}>
            <Typography variant={'bodySmall'} color={'purpleLightest'}>
              Select wallet
            </Typography>
          </Box>
          <SelectInputBoxForm
            offsetPadding={DEFAULT_CONTAINER_PADDING}
            control={control}
            name={'walletId'}
            items={wallets?.map(item => ({
              label: item.accountName,
              value: item.walletId,
            }))}
          />
        </Box>

        <Box pt={'26px'} ph={DEFAULT_CONTAINER_PADDING}>
          <InputContainer errorMessage={formState.errors.merchantName?.message}>
            <TextInputFormBox
              preIcon={
                <LocalSvg asset={require('../../assets/icons/shop.svg')} />
              }
              placeholder={'Merchant name'}
              control={control}
              name={'merchantName'}
            />
            <DateTimeInputFormBox
              control={control}
              name={'transactionDate'}
              preIcon={<CalenderOutline />}
              placeholder={'Date & Time'}
              mode={'datetime'}
              dateFormat={'DD MMM, YYYY - h:m:a'}
            />
            <TextInputFormBox
              preIcon={<EditOutline />}
              placeholder={'Note'}
              control={control}
              name={'note'}
            />
          </InputContainer>
        </Box>
      </Box>
    </Box>
  );
};
export default ManageTransactionFormWidget;
