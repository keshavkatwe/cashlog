import AxiosInstance from '../axiosInstance/axiosInstance';
import type {ISaveTransactionRequestDto} from './dto/saveTransaction.dto';
import type ITransaction from '../../types/ITransaction';
import type {IGetTransactionResponseDto} from './dto/getTransaction.dto';
import type {IGetTransactionRequestDto} from './dto/getTransaction.dto';

export const saveTransaction = (
  payload: ISaveTransactionRequestDto,
): Promise<ITransaction> => AxiosInstance.post('/transactions', payload);

export const updateTransaction = (
  transactionId?: number,
  payload?: ISaveTransactionRequestDto,
): Promise<ITransaction> =>
  AxiosInstance.patch(`/transactions/${transactionId}`, payload);

export const getTransactionApi = (
  transactionId?: number,
): Promise<ITransaction> => AxiosInstance.get(`/transactions/${transactionId}`);

export const getTransactionsApi = (
  request: IGetTransactionRequestDto,
): Promise<IGetTransactionResponseDto> =>
  AxiosInstance.get('/transactions/getTransactionAnalytics', {
    params: request,
  });

export const deleteTransactionApi = (id: number) =>
  AxiosInstance.delete(`/transactions/${id}`);
