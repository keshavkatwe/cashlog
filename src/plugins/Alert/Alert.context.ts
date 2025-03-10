import React from 'react';
import type {IAlertActions, IAlertState} from './Alert.types';

export const AlertContext = React.createContext<
  [IAlertState, React.Dispatch<IAlertActions> | null]
>([{}, null]);
