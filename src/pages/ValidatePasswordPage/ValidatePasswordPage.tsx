import {
  Box,
  Button,
  InputContainer,
  Loader,
  MainContainer,
  TextInputFormBox,
  Typography,
} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {LockOutline} from '../../assets/icons';
import type IRootStackParamList from '../../types/IRootStackParamList';
import type {NavigationProp, RouteProp} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import type {IValidatePasswordFormState} from './ValidatePasswordPage.types';
import {useCallback} from 'react';
import {forgetPasswordApi, login} from '../../services/authService/authService';
import {setToStorage} from '../../helpers/localStorage';
import {usePromise} from '../../hooks/usePromise';
import {useAlert} from '../../plugins/Alert';
import useStartUp from '../../hooks/useStartUp';
import type {IForgetPasswordResponseDto} from '../../services/authService/dto/forgetPassword.dto';
import type IApiException from '../../types/IApiException';

const schema = yup
  .object({
    password: yup.string().required(),
  })
  .required();

const ValidatePasswordPage = () => {
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const {params} =
    useRoute<RouteProp<IRootStackParamList, 'ValidatePasswordPage'>>();
  const {showError} = useAlert();
  const {setupInitial} = useStartUp();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IValidatePasswordFormState>({
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const {trigger: formSubmit, isLoading} = usePromise(
    useCallback(
      async (formData?: IValidatePasswordFormState) => {
        if (!formData) {
          return Promise.reject();
        }
        const {token} = await login({
          email: params?.email || '',
          password: formData.password,
        });

        if (token) {
          await setToStorage('token', token);
          await setupInitial();
        }
      },
      [params?.email, setupInitial],
    ),
    {
      onError: err => showError('Verification failed', err?.message),
    },
  );

  const {trigger: triggerForgetPassword, isLoading: isPasswordResetting} =
    usePromise(
      useCallback(async () => {
        if (params?.email) {
          return await forgetPasswordApi(params.email);
        }
      }, [params?.email]),
      {
        onSuccess: useCallback(
          (res?: IForgetPasswordResponseDto) => {
            navigation.navigate('ValidateOtpPage', {
              email: params?.email,
              uniqueRequestId: res?.uniqueIdentifier,
              backNavigate: 'ResetPassword',
            });
          },
          [navigation, params?.email],
        ),
        onError: useCallback(
          (err?: IApiException) => {
            showError('Reset password failed', err?.message);
          },
          [showError],
        ),
      },
    );

  return (
    <MainContainer>
      <Box
        ph={DEFAULT_CONTAINER_PADDING}
        pb={DEFAULT_CONTAINER_PADDING}
        flex={1}>
        <Box flex={1}>
          <Typography variant={'h2'}>Email Verification</Typography>
          <Typography color={'grey'}>
            Record your daily transactions within seconds.
          </Typography>
          <Box pt={'50px'}>
            <InputContainer errorMessage={errors.password?.message}>
              <TextInputFormBox
                control={control}
                name={'password'}
                placeholder={'Enter password'}
                preIcon={<LockOutline />}
                textContentType={'password'}
                autoCapitalize={'none'}
                secureTextEntry
              />
            </InputContainer>
          </Box>
          <Box pt={'18px'} alignItems={'flex-end'}>
            {isPasswordResetting ? (
              <Box height={'50px'} width={'50px'}>
                <Loader />
              </Box>
            ) : (
              <TouchableOpacity onPress={triggerForgetPassword}>
                <Typography color={'pink'} variant={'h6'}>
                  Forgot Password?
                </Typography>
              </TouchableOpacity>
            )}
          </Box>
        </Box>
        <Box>
          <Button isLoading={isLoading} onPress={handleSubmit(formSubmit)}>
            Verify
          </Button>
        </Box>
      </Box>
    </MainContainer>
  );
};
export default ValidatePasswordPage;
