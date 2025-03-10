import type {PropsWithChildren} from 'react';
import {useCallback, useReducer} from 'react';
import {AlertContext} from './Alert.context';
import type {IAlertActions, IAlertState} from './Alert.types';
import {AlertBox, Box} from '../../components';
import {Modal, SafeAreaView} from 'react-native';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';

interface IAlertProviderProps {}
const AlertProvider = ({children}: PropsWithChildren<IAlertProviderProps>) => {
  const alertReducer = useCallback(
    (state: IAlertState, action: IAlertActions): IAlertState => {
      switch (action.type) {
        case 'SET_ERROR':
          return {
            ...state,
            error: {
              title: action.title,
              message: action.message,
              alertType: action.alertType,
            },
          };
        case 'RESET_ERROR':
          return {
            ...state,
            error: undefined,
          };
        default:
          return state;
      }
    },
    [],
  );
  const [alertState, setAlertState] = useReducer(alertReducer, {});

  return (
    <AlertContext.Provider value={[alertState, setAlertState]}>
      {children}
      <Modal
        transparent
        visible={!!alertState.error}
        animationType={'slide'}
        statusBarTranslucent={false}>
        <SafeAreaView>
          <Box p={DEFAULT_CONTAINER_PADDING}>
            <AlertBox
              title={alertState?.error?.title}
              message={alertState?.error?.message}
              alertType={alertState?.error?.alertType}
              onTap={() => {
                setAlertState({
                  type: 'RESET_ERROR',
                });
              }}
            />
          </Box>
        </SafeAreaView>
      </Modal>
    </AlertContext.Provider>
  );
};
export default AlertProvider;
