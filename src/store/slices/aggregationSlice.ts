import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type IWalletAgre from '../../types/IWalletAgre';

interface IAggregationState {
  todaySpent?: number;
  wallet?: IWalletAgre;
}

const initialState: IAggregationState = {
  todaySpent: 0,
  wallet: {},
};

const aggregationSlice = createSlice({
  name: 'aggregation',
  initialState,
  reducers: {
    setAggregation: (state, action: PayloadAction<IAggregationState>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {setAggregation} = aggregationSlice.actions;
export default aggregationSlice.reducer;
