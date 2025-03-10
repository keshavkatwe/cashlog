import {useCallback, useMemo, useState} from 'react';
import type {IUsePromiseOptions} from './usePromise.types';
import type IApiException from '../../types/IApiException';

function usePromise<IReq, IRes>(
  promiseCallback: (args: IReq) => Promise<IRes>,
  options?: IUsePromiseOptions<IRes>,
) {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<IRes>();

  const onSuccessCallback = useMemo(
    () => options?.onSuccess,
    [options?.onSuccess],
  );

  const onErrorCallback = useMemo(() => options?.onError, [options?.onError]);

  const triggerPromise = useCallback(
    async (args: IReq) => {
      setIsLoading(true);
      setIsPageLoading(true);
      try {
        const res = await promiseCallback(args);
        setIsLoading(false);
        setIsPageLoading(false);
        setData(res);
        onSuccessCallback?.(res);
      } catch (e) {
        setError(e || true);
        setIsLoading(false);
        setIsPageLoading(false);
        onErrorCallback?.(e as IApiException);
        return Promise.reject(e);
      }
    },
    [onErrorCallback, onSuccessCallback, promiseCallback],
  );

  const trigger = useCallback(
    (args?: IReq) => {
      // @ts-ignore
      triggerPromise(args).catch(() => {});
    },
    [triggerPromise],
  );

  return {
    isLoading,
    isPageLoading,
    trigger,
    error,
    data,
  };
}

export default usePromise;
