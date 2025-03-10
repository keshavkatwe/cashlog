import AxiosInstance from '../axiosInstance/axiosInstance';
import type {StartUpDtoResponse} from './dto/startUp.dto';
import type {AgrSpendsApiDtoResponse} from './dto/agrSpendsApi.dto';

export const startUp = (): Promise<StartUpDtoResponse> =>
  AxiosInstance.get('/startUp');

export const agrSpendsApi = (): Promise<AgrSpendsApiDtoResponse> =>
  AxiosInstance.get('/startUp/dailySpentAndMonthlySpent');
