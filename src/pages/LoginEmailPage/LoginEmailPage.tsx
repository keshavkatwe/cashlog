import {
  Box,
  Button,
  InputContainer,
  MainContainer,
  TextInputFormBox,
  Typography,
} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {ProfileOutline} from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type IRootStackParamList from '../../types/IRootStackParamList';
import {useForm} from 'react-hook-form';
import {useCallback} from 'react';
import type {IEmailFormState} from './LoginEmailPage.types';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  loginWithEmail,
  loginWithGoogle,
} from '../../services/authService/authService';
import {usePromise} from '../../hooks/usePromise';
import {useAlert} from '../../plugins/Alert';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {PageLoading} from '../../components/PageLoading';
import {Modal, TouchableOpacity} from 'react-native';
import {setToStorage} from '../../helpers/localStorage';
import useStartUp from '../../hooks/useStartUp';
import {SvgXml} from 'react-native-svg';
import googleSignInSvg from '../../assets/icons/google-signin.svg';

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const LoginEmailPage = () => {
  const navigate =
    useNavigation<NativeStackNavigationProp<IRootStackParamList>>();
  const {showError} = useAlert();
  const {setupInitial} = useStartUp();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IEmailFormState>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const {trigger, isLoading} = usePromise(
    useCallback(async (payload?: IEmailFormState) => {
      if (!payload) {
        return Promise.reject();
      }
      const res = await loginWithEmail(payload.email.toLowerCase());
      return {
        ...res,
        email: payload.email,
      };
    }, []),
    {
      onSuccess: res => {
        if (res.isUserExist) {
          navigate.navigate('ValidatePasswordPage', {
            email: res.email,
          });
        } else {
          navigate.navigate('ValidateOtpPage', {
            email: res.email,
            uniqueRequestId: res.uniqueIdentifier,
            isNewUser: true,
          });
        }
      },
      onError: err => showError('Login failed', err?.message),
    },
  );

  const {trigger: googleSignIn, isLoading: isGoogleSignLoading} = usePromise(
    useCallback(async () => {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {token} = await loginWithGoogle({
        idToken: userInfo.idToken,
      });
      if (token) {
        await setToStorage('token', token);
        await setupInitial();
      }
    }, [setupInitial]),
  );

  return (
    <MainContainer>
      <Box
        ph={DEFAULT_CONTAINER_PADDING}
        pb={DEFAULT_CONTAINER_PADDING}
        flex={1}>
        <Box flex={1}>
          <Typography variant={'h2'}>Welcome back</Typography>
          <Typography variant={'body'} color={'grey'}>
            Record your daily transactions within seconds.
          </Typography>
          <Box pt={'50px'}>
            <InputContainer errorMessage={errors.email?.message}>
              <TextInputFormBox
                control={control}
                name={'email'}
                placeholder={'Email Address'}
                preIcon={<ProfileOutline />}
                textContentType={'emailAddress'}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
              />
            </InputContainer>
          </Box>
        </Box>
        <Box>
          <Button onPress={handleSubmit(trigger)} isLoading={isLoading}>
            Sign In
          </Button>
        </Box>

        <Box alignItems={'center'} justifyContent={'center'}>
          <Box pv={'16px'}>
            <Typography variant={'lead'} color={'grey'}>
              Or
            </Typography>
          </Box>
          <TouchableOpacity onPress={googleSignIn}>
            <SvgXml xml={googleSignInSvg} />
          </TouchableOpacity>
        </Box>
      </Box>
      <Modal visible={isGoogleSignLoading} transparent>
        <PageLoading title={'Signing in process...'} />
      </Modal>
    </MainContainer>
  );
};
export default LoginEmailPage;
