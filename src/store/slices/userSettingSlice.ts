import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../store';

interface IUserSettingState {
  settings: {
    currencyId?: number;
  };
}

const initialState: IUserSettingState = {
  settings: {},
};

const userSettingSlice = createSlice({
  name: 'userSetting',
  initialState,
  reducers: {
    setUserSetting: (_, action: PayloadAction<IUserSettingState>) =>
      action.payload,
  },
});

export const {setUserSetting} = userSettingSlice.actions;
export default userSettingSlice.reducer;
export const userCurrencyState = (state: RootState) =>
  state.currencies.currencies.find(
    currencyItem =>
      currencyItem.currencyId === state.userSetting.settings.currencyId,
  );
