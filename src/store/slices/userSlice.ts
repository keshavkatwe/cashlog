import type {PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type IUser from '../../types/IUser';
import {startUp} from '../../services/startUpService/startUpService';
import type {IApiStatus} from '../../types/IApiStatus';
import {setCategories} from './categoriesSlice';
import {setWalletTypes} from './walletTypesSlice';
import {setTransactions} from './transactionsSlice';
import {setAggregation} from './aggregationSlice';
import {setWallets} from './walletsSlice';
import {setCurrencies} from './currenciesSlice';
import {setUserSetting} from './userSettingSlice';
import {getFromStorage} from '../../helpers/localStorage';
import type IApiException from '../../types/IApiException';

interface IUserState {
  user?: IUser;
  startupStatus?: IApiStatus;
}

const initialState: IUserState = {};

export const fetchStartUp = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    const token = await getFromStorage('token');
    if (!token) {
      return Promise.resolve();
    }

    try {
      const {
        categories,
        userProfile,
        userWallets,
        recentUserTransactions,
        sumOfTodayTransactions,
        monthlySpentAmountPerWallet,
        userSettings,
        currencies,
        walletTypes,
      } = await startUp();
      thunkAPI.dispatch(
        setCategories(
          categories?.sort((__, b) => (b.code === 'OTHER' ? -1 : 0)) || [],
        ),
      );

      thunkAPI.dispatch(setWalletTypes(walletTypes || []));
      thunkAPI.dispatch(setTransactions(recentUserTransactions || []));
      thunkAPI.dispatch(
        setAggregation({
          todaySpent: sumOfTodayTransactions,
          wallet: monthlySpentAmountPerWallet?.aggregation,
        }),
      );

      thunkAPI.dispatch(setWallets(userWallets || []));

      thunkAPI.dispatch(
        setCurrencies({
          currencies,
        }),
      );

      if (userSettings?.currency?.currencyId) {
        thunkAPI.dispatch(
          setUserSetting({
            settings: {
              currencyId: userSettings.currency.currencyId,
            },
          }),
        );
      }

      return userProfile;
    } catch (e) {
      if ((e as IApiException)?.statusCode !== 401) {
        return Promise.reject(e);
      }
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (_, action: PayloadAction<IUser>) => ({
      user: action.payload,
      startupStatus: 'SUCCESS',
    }),

    resetProfile: () => ({
      user: undefined,
      startupStatus: 'SUCCESS' as IApiStatus,
    }),
  },
  extraReducers(builder) {
    builder.addCase(fetchStartUp.fulfilled, (_, action) => ({
      startupStatus: 'SUCCESS',
      user: action.payload || undefined,
    }));
    builder.addCase(fetchStartUp.pending, () => ({
      startupStatus: 'LOADING',
    }));
    builder.addCase(fetchStartUp.rejected, () => ({
      startupStatus: 'FAILURE',
    }));
  },
});

export const {setProfile, resetProfile} = userSlice.actions;
export default userSlice.reducer;
