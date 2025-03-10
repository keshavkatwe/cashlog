import axiosInstance from '../axiosInstance/axiosInstance';
import type {AddWalletRequestDto} from './dto/addWallet.dto';
import type IWallet from '../../types/IWallet';

export const addWalletApi = (payload: AddWalletRequestDto): Promise<IWallet> =>
  axiosInstance.post('/wallet', payload);

export const updateWalletApi = (
  walletId: number,
  payload: AddWalletRequestDto,
): Promise<IWallet> => axiosInstance.patch('/wallet/' + walletId, payload);
