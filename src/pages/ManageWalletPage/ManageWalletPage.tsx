import {
  Box,
  Button,
  InputContainer,
  MainContainer,
  PickerInputBox,
  TextInputFormBox,
} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {LocalSvg} from 'react-native-svg';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import type {IManageWalletPageForm} from './ManageWalletPage.types';
import {yupResolver} from '@hookform/resolvers/yup';
import type {ObjectSchema} from 'yup';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  addWalletApi,
  updateWalletApi,
} from '../../services/walletService/walletService';
import {useAppDispatch, useAppSelector} from '../../store';
import {addWallet, updateWallet} from '../../store/slices/walletsSlice';
import {usePromise} from '../../hooks/usePromise';
import type {RouteProp} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAlert} from '../../plugins/Alert';
import type IRootStackParamList from '../../types/IRootStackParamList';
import SelectWalletTypeWidget from '../../widgets/SelectWalletTypeWidget/SelectWalletTypeWidget';

const schema: ObjectSchema<IManageWalletPageForm> = yup
  .object({
    accountName: yup.string().required(),
    walletType: yup.number().required(),
    description: yup.string().optional(),
  })
  .required();

const ManageWalletPage = () => {
  const {params} = useRoute<RouteProp<IRootStackParamList, 'ManageWallet'>>();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {showError} = useAlert();
  const {walletTypes} = useAppSelector(state => state.walletTypes);
  const isUpdate = !!params.wallet;
  const [isShowSelectType, setIsShowSelectType] = useState(false);
  const {control, watch, formState, setValue, handleSubmit} =
    useForm<IManageWalletPageForm>({
      defaultValues: {
        accountName: params.wallet?.accountName || '',
        description: params.wallet?.description || '',
        walletType:
          params.wallet?.walletType.walletTypeId ||
          params?.walletTypeId ||
          walletTypes[0].walletTypeId,
      },
      resolver: yupResolver(schema),
    });

  const selectedWalletTypeId = watch('walletType');
  const selectWalletType = useMemo(
    () =>
      walletTypes.find(
        walletItem => walletItem.walletTypeId === selectedWalletTypeId,
      ),
    [selectedWalletTypeId, walletTypes],
  );

  const {trigger: submitForm, isLoading} = usePromise(
    useCallback(
      async (formData?: IManageWalletPageForm) => {
        if (!formData) {
          return Promise.reject();
        }
        if (isUpdate) {
          const updatedWallet = await updateWalletApi(params.wallet?.walletId, {
            accountName: formData.accountName,
            description: formData.description,
            walletTypeId: formData.walletType,
          });
          dispatch(
            updateWallet({
              walletId: params.wallet?.walletId,
              wallet: updatedWallet,
            }),
          );
        } else {
          const newWallet = await addWalletApi({
            accountName: formData.accountName,
            description: formData.description,
            walletTypeId: formData.walletType,
          });
          dispatch(addWallet(newWallet));
        }
      },
      [dispatch, isUpdate, params.wallet?.walletId],
    ),
    {
      onSuccess: () => navigation.goBack(),
      onError: err => showError('Add wallet failed', err?.message),
    },
  );

  useEffect(() => {
    if (isUpdate) {
      navigation.setOptions({
        title: 'Edit wallet',
      });
    }
  }, [isUpdate, navigation]);

  return (
    <>
      <MainContainer>
        <Box ph={DEFAULT_CONTAINER_PADDING} flex={1}>
          <Box>
            <Box pt={'10px'}>
              <InputContainer
                errorMessage={
                  formState.errors.accountName?.message ||
                  formState.errors.walletType?.message
                }>
                <TextInputFormBox
                  control={control}
                  name={'accountName'}
                  placeholder={'Account name'}
                  preIcon={
                    <LocalSvg asset={require('../../assets/icons/edit.svg')} />
                  }
                />
                <PickerInputBox
                  placeholder={'Cash wallet'}
                  displayValue={selectWalletType?.label}
                  preIcon={
                    <LocalSvg
                      asset={require('../../assets/icons/Wallet.svg')}
                    />
                  }
                  onClick={() => setIsShowSelectType(true)}
                />
              </InputContainer>
            </Box>
          </Box>
          <Box pt={'16px'}>
            <Box pt={'10px'}>
              <InputContainer
                errorMessage={formState.errors.description?.message}>
                <TextInputFormBox
                  control={control}
                  name={'description'}
                  placeholder={'Description'}
                  preIcon={
                    <LocalSvg asset={require('../../assets/icons/edit.svg')} />
                  }
                />
              </InputContainer>
            </Box>
          </Box>
        </Box>
        <Box p={DEFAULT_CONTAINER_PADDING}>
          <Button isLoading={isLoading} onPress={handleSubmit(submitForm)}>
            Save
          </Button>
        </Box>
      </MainContainer>
      <SelectWalletTypeWidget
        isShow={isShowSelectType}
        onWalletTypeSelected={walletTypeId => {
          setValue('walletType', walletTypeId);
          setIsShowSelectType(false);
        }}
        onClose={() => setIsShowSelectType(false)}
      />
    </>
  );
};
export default ManageWalletPage;
