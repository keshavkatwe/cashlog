import type {NavigationProp, RouteProp} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';
import {useForm} from 'react-hook-form';
import {usePromise} from '../../hooks/usePromise';
import {useCallback, useState} from 'react';
import {
  Box,
  Button,
  InputContainer,
  MainContainer,
  TextInputFormBox,
  Typography,
} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {EyeHide} from '../../assets/icons';
import {updatePasswordApi} from '../../services/authService/authService';
import {TouchableOpacity} from 'react-native';
import Eye from '../../assets/icons/Eye';
import type {IResetPasswordTypes} from './ResetPassword.types';
import type IApiException from '../../types/IApiException';
import {useAlert} from '../../plugins/Alert';

const ResetPassword = () => {
  const {params} = useRoute<RouteProp<IRootStackParamList, 'ResetPassword'>>();
  const {showSuccess, showError} = useAlert();
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<IResetPasswordTypes>({
    defaultValues: {
      password: '',
    },
  });

  const {trigger, isLoading} = usePromise(
    useCallback(
      async (req: IResetPasswordTypes) => {
        await updatePasswordApi({
          password: req.password,
          otp: params.otp,
          uniqueIdentifier: params.uniqueRequestId,
        });
      },
      [params.otp, params.uniqueRequestId],
    ),
    {
      onSuccess: useCallback(() => {
        showSuccess('Password reset successful');
        navigation.navigate('LoginEmailPage');
      }, [navigation, showSuccess]),
      onError: useCallback(
        (api?: IApiException) => {
          showError('Set password failed', api?.message);
        },
        [showError],
      ),
    },
  );

  const toggleSecureEntry = useCallback(() => {
    setIsSecureEntry(prevState => !prevState);
  }, []);
  return (
    <MainContainer>
      <Box
        ph={DEFAULT_CONTAINER_PADDING}
        pb={DEFAULT_CONTAINER_PADDING}
        flex={1}>
        <Box flex={1}>
          <Typography variant={'h2'}>Set Password</Typography>
          <Typography variant={'body'} color={'grey'}>
            Protect your account with a strong and unique password.
          </Typography>
          <Box pt={'50px'}>
            <InputContainer errorMessage={errors.password?.message}>
              <TextInputFormBox
                control={control}
                name={'password'}
                placeholder={'Secure Password'}
                textContentType={'password'}
                secureTextEntry={isSecureEntry}
                postIcon={
                  <TouchableOpacity onPress={toggleSecureEntry}>
                    {isSecureEntry ? <EyeHide /> : <Eye />}
                  </TouchableOpacity>
                }
              />
            </InputContainer>
          </Box>
        </Box>
        <Box>
          <Button onPress={handleSubmit(trigger)} isLoading={isLoading}>
            Reset
          </Button>
        </Box>
      </Box>
    </MainContainer>
  );
};
export default ResetPassword;
