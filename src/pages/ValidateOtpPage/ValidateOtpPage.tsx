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
import {usePromise} from '../../hooks/usePromise';
import {useCallback} from 'react';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import type {IValidateOtpPageFormState} from './ValidateOtpPage.types';
import {resendApi, validateOtp} from '../../services/authService/authService';
import {setToStorage} from '../../helpers/localStorage';
import {useAlert} from '../../plugins/Alert';
import type IApiException from '../../types/IApiException';

const schema = yup
  .object({
    otp: yup.string().required(),
  })
  .required();

const ValidateOtpPage = () => {
  const {params} =
    useRoute<RouteProp<IRootStackParamList, 'ValidateOtpPage'>>();
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const {showError} = useAlert();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IValidateOtpPageFormState>({
    defaultValues: {
      otp: '',
    },
    resolver: yupResolver(schema),
  });

  const {trigger, isLoading} = usePromise(
    useCallback(
      async (payload?: IValidateOtpPageFormState) => {
        if (!payload) {
          return Promise.reject();
        }
        const {token} = await validateOtp({
          otp: +payload.otp,
          uniqueRequestId: params?.uniqueRequestId || '',
          isNewUser: params?.isNewUser || false,
        });

        if (token) {
          await setToStorage('token', token);
        }

        return {
          otp: payload.otp,
        };
      },
      [params?.isNewUser, params?.uniqueRequestId],
    ),
    {
      onSuccess: useCallback(
        ({otp}: {otp: string}) => {
          if (params.backNavigate) {
            navigation.navigate(params.backNavigate, {
              uniqueRequestId: params.uniqueRequestId || '',
              otp,
            });
          } else {
            navigation.navigate('BasicInfoPage', {
              uniqueRequestId: params.uniqueRequestId || '',
            });
          }
        },
        [navigation, params.backNavigate, params.uniqueRequestId],
      ),
      onError: useCallback(
        (err?: IApiException) => showError('Verification failed', err?.message),
        [showError],
      ),
    },
  );

  const {trigger: triggerResend, isLoading: isResending} = usePromise(
    useCallback(async () => {
      if (params?.uniqueRequestId) {
        await resendApi(params?.uniqueRequestId);
      }
    }, [params?.uniqueRequestId]),
  );

  return (
    <MainContainer>
      <Box
        ph={DEFAULT_CONTAINER_PADDING}
        pb={DEFAULT_CONTAINER_PADDING}
        flex={1}>
        <Box flex={1}>
          <Typography variant={'h2'}>Email Verification</Typography>
          <Typography color={'grey'}>OTP is sent to email address</Typography>
          <Typography variant={'h6'} color={'grey'}>
            {params?.email}
          </Typography>
          <Box pt={'50px'}>
            <InputContainer errorMessage={errors.otp?.message}>
              <TextInputFormBox
                control={control}
                name={'otp'}
                placeholder={'Enter OTP'}
                preIcon={<LockOutline />}
              />
            </InputContainer>
          </Box>
          <Box flexDir={'row'} pt={'18px'}>
            {isResending ? (
              <Box height={'50px'} width={'50px'}>
                <Loader />
              </Box>
            ) : (
              <>
                <Typography>Didn't receive the OTP? </Typography>
                <TouchableOpacity onPress={triggerResend}>
                  <Typography color={'pink'} variant={'h6'}>
                    Resend OTP
                  </Typography>
                </TouchableOpacity>
              </>
            )}
          </Box>
        </Box>
        <Box>
          <Button isLoading={isLoading} onPress={handleSubmit(trigger)}>
            Verify
          </Button>
        </Box>
      </Box>
    </MainContainer>
  );
};
export default ValidateOtpPage;
