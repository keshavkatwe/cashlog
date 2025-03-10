import type IApiException from '../../types/IApiException';

export interface IUsePromiseOptions<IRes> {
  onSuccess?: (res: IRes) => void;
  onError?: (err?: IApiException) => void;
}
