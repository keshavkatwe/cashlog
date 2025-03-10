import type {IUpdateUserSettingsRequestDto} from './dto/updateUserSettings.dto';
import {axiosInstance} from '../axiosInstance';

export const updateUserSettingsApi = (req: IUpdateUserSettingsRequestDto) =>
  axiosInstance.patch('/userSettings/updateUserSettings', req);
