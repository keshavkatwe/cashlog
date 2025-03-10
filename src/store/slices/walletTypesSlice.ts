import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type IWalletType from '../../types/IWalletType';

interface IWalletTypesState {
  walletTypes: IWalletType[];
}

const initialState: IWalletTypesState = {
  walletTypes: [],
};

const walletTypesSlice = createSlice({
  name: 'walletTypes',
  initialState,
  reducers: {
    setWalletTypes: (_, action: PayloadAction<IWalletType[]>) => ({
      walletTypes: action.payload,
    }),
  },
});

export const {setWalletTypes} = walletTypesSlice.actions;
export default walletTypesSlice.reducer;
