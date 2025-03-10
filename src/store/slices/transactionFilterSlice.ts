import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type IDateRangeType from '../../types/IDateRangeType';

interface ITransactionFilterState {
  dateRange: IDateRangeType;
  categories: Record<number, boolean>;
}

const initialState: ITransactionFilterState = {
  dateRange: 'CURRENT_MONTH',
  categories: {},
};

const transactionFilter = createSlice({
  name: 'transactionFilter',
  initialState,
  reducers: {
    setTransactionFilters(
      state,
      action: PayloadAction<Partial<ITransactionFilterState>>,
    ) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export default transactionFilter.reducer;
export const {setTransactionFilters} = transactionFilter.actions;
