import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type ICurrency from '../../types/ICurrency';

interface ICurrenciesState {
  currencies: ICurrency[];
}

const initialState: ICurrenciesState = {
  currencies: [],
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setCurrencies: (_, action: PayloadAction<ICurrenciesState>) =>
      action.payload,
  },
});

export const {setCurrencies} = currenciesSlice.actions;
export default currenciesSlice.reducer;
