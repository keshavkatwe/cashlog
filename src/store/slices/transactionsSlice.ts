import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type ITransaction from '../../types/ITransaction';

interface ITransactionsState {
  transactions: ITransaction[];
}

const initialState: ITransactionsState = {
  transactions: [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (_, action: PayloadAction<ITransaction[]>) => ({
      transactions: action.payload,
    }),
    addTransaction: (state, action: PayloadAction<ITransaction>) => ({
      transactions: [action.payload, ...state.transactions],
    }),
    updateTransactionState: (state, action: PayloadAction<ITransaction>) => {
      const findTransactionIndex = state.transactions.findIndex(
        value => value.transactionId === action.payload.transactionId,
      );
      state.transactions[findTransactionIndex] = action.payload;
      return state;
    },
  },
});

export const {setTransactions, addTransaction, updateTransactionState} =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
