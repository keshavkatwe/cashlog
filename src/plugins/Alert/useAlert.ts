import {useCallback, useContext} from 'react';
import {AlertContext} from './Alert.context';

const useAlert = () => {
  const [_, setAlert] = useContext(AlertContext);

  const showError = useCallback(
    (title: string, message?: string, timerInSec: number = 4) => {
      if (setAlert) {
        setAlert({
          type: 'SET_ERROR',
          message,
          title,
          timer: timerInSec,
          alertType: 'ERROR',
        });

        setTimeout(() => {
          setAlert({
            type: 'RESET_ERROR',
          });
        }, timerInSec * 1000);
      }
    },
    [setAlert],
  );

  const showSuccess = useCallback(
    (title: string, message?: string, timerInSec: number = 4) => {
      if (setAlert) {
        setAlert({
          type: 'SET_ERROR',
          message,
          title,
          timer: timerInSec,
          alertType: 'SUCCESS',
        });

        setTimeout(() => {
          setAlert({
            type: 'RESET_ERROR',
          });
        }, timerInSec * 1000);
      }
    },
    [setAlert],
  );

  return {
    showError,
    showSuccess,
  };
};
export default useAlert;
