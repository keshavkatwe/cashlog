import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type IWallet from '../../types/IWallet';

interface IWalletsState {
  wallets: IWallet[];
}

const initialState: IWalletsState = {
  wallets: [],
};

const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    setWallets: (_, action: PayloadAction<IWallet[]>) => ({
      wallets: action.payload,
    }),
    addWallet: (state, action: PayloadAction<IWallet>) => ({
      wallets: [...state.wallets, action.payload],
    }),
    updateWallet: (
      state,
      action: PayloadAction<{walletId: number; wallet: IWallet}>,
    ) => {
      const walletIndex = state.wallets.findIndex(
        walletItem => walletItem.walletId === action.payload.walletId,
      );
      state.wallets[walletIndex] = action.payload.wallet;
      return state;
    },
  },
});

export const {setWallets, addWallet, updateWallet} = walletsSlice.actions;
export default walletsSlice.reducer;
