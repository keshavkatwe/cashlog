import {axiosInstance} from '../axiosInstance';
import type {IHelpSupportApiRequestDto} from './dto/helpSupportApi.dto';

export const helpSupportApi = (payload: IHelpSupportApiRequestDto) =>
  axiosInstance.post('/helpSupport', payload);
