import AxiosInstance from '../axiosInstance/axiosInstance';
import type {LoginRequestDto, LoginResponseDto} from './dto/login.dto';
import type {LoginWithEmailResponseDto} from './dto/loginWithEmail.dto';
import type {IValidateOtpRequestDto} from './dto/validateOtp.dto';
import type {IForgetPasswordResponseDto} from './dto/forgetPassword.dto';
import type {IUpdatePasswordRequestDto} from './dto/updatePassword.dto';
import type {LoginWithGoogleRequestDto} from './dto/loginWithGoogle.dto';

export const login = (payload: LoginRequestDto): Promise<LoginResponseDto> =>
  AxiosInstance.post('/auth/login', payload);
export const loginWithGoogle = (
  payload: LoginWithGoogleRequestDto,
): Promise<LoginResponseDto> =>
  AxiosInstance.post('/auth/loginWithGoogle', payload);

export const loginWithEmail = (
  email: string,
): Promise<LoginWithEmailResponseDto> =>
  AxiosInstance.get('/auth/loginWithEmail', {
    params: {
      email,
    },
  });

export const validateOtp = (
  payload: IValidateOtpRequestDto,
): Promise<LoginResponseDto> =>
  AxiosInstance.post('/auth/validateOtp', payload);

export const forgetPasswordApi = (
  email: string,
): Promise<IForgetPasswordResponseDto> =>
  AxiosInstance.get('/auth/forgotPassword', {
    params: {email},
  });

export const updatePasswordApi = (req: IUpdatePasswordRequestDto) =>
  AxiosInstance.post('/auth/updatePassword', req);

export const resendApi = (uniqueIdentifier: string) =>
  AxiosInstance.get('/auth/resendOtp', {
    params: {
      uniqueIdentifier,
    },
  });
