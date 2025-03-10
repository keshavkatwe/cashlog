import type {IUpdateBasicRequestDto} from './dto/updateBasic.dto';
import {axiosInstance} from '../axiosInstance';
import type {IUpdateProfileRequestDto} from './dto/updateProfile.dto';
import type IUser from '../../types/IUser';

export const updateBasic = (
  payload: IUpdateBasicRequestDto,
  uniqueRequestId?: string,
): Promise<void> =>
  axiosInstance.patch('/users/updateBasic', payload, {
    params: {
      uniqueRequestId,
    },
  });

export const updateProfileApi = (
  payload: IUpdateProfileRequestDto,
): Promise<IUser> => axiosInstance.patch('/users/updateProfile', payload);
