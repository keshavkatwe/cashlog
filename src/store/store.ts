import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import walletsSlice from './slices/walletsSlice';
import categoriesSlice from './slices/categoriesSlice';
import walletTypesSlice from './slices/walletTypesSlice';
import transactionsSlice from './slices/transactionsSlice';
import aggregationSlice from './slices/aggregationSlice';
import * as Sentry from '@sentry/react-native';
import transactionFilterSlice from './slices/transactionFilterSlice';
import userSettingSlice from './slices/userSettingSlice';
import currenciesSlice from './slices/currenciesSlice';

const sentryReduxEnhancer = Sentry.createReduxEnhancer({});

const store = configureStore({
  reducer: {
    user: userSlice,
    wallets: walletsSlice,
    categories: categoriesSlice,
    walletTypes: walletTypesSlice,
    transactions: transactionsSlice,
    aggregation: aggregationSlice,
    transactionFilter: transactionFilterSlice,
    userSetting: userSettingSlice,
    currencies: currenciesSlice,
  },
  enhancers: [sentryReduxEnhancer],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
