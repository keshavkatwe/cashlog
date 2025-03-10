export type IAlertType = 'ERROR' | 'SUCCESS';
interface IAlertError {
  title: string;
  alertType: IAlertType;
  message?: string;
  timer?: number;
}

export interface IAlertState {
  error?: IAlertError;
}

export interface IAlertActionSetError {
  type: 'SET_ERROR';
  title: string;
  message?: string;
  timer?: number;
  alertType: IAlertType;
}
export interface IAlertActionResetError {
  type: 'RESET_ERROR';
}

export type IAlertActions = IAlertActionSetError | IAlertActionResetError;
