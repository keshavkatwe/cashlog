import {useCallback} from 'react';
import {agrSpendsApi, startUp} from '../services/startUpService/startUpService';
import {resetProfile, setProfile} from '../store/slices/userSlice';
import {setWallets} from '../store/slices/walletsSlice';
import {setCategories} from '../store/slices/categoriesSlice';
import {setWalletTypes} from '../store/slices/walletTypesSlice';
import {setTransactions} from '../store/slices/transactionsSlice';
import {setAggregation} from '../store/slices/aggregationSlice';
import {useAppDispatch} from '../store';
import * as Sentry from '@sentry/react-native';
import {setUserSetting} from '../store/slices/userSettingSlice';
import {setCurrencies} from '../store/slices/currenciesSlice';
import {deleteFromStorage} from '../helpers/localStorage';

const useStartUp = () => {
  const dispatch = useAppDispatch();
  const setupInitial = useCallback(async () => {
    const {
      userProfile,
      userWallets,
      categories,
      walletTypes,
      recentUserTransactions,
      sumOfTodayTransactions,
      monthlySpentAmountPerWallet,
      userSettings,
      currencies,
    } = await startUp();

    Sentry.setUser({
      email: userProfile.email,
      id: userProfile.userId + '',
    });

    dispatch(setProfile(userProfile));
    dispatch(
      setCategories(
        categories?.sort((_, b) => (b.code === 'OTHER' ? -1 : 0)) || [],
      ),
    );
    dispatch(setWalletTypes(walletTypes || []));
    dispatch(setTransactions(recentUserTransactions || []));
    dispatch(
      setAggregation({
        todaySpent: sumOfTodayTransactions,
        wallet: monthlySpentAmountPerWallet?.aggregation,
      }),
    );

    dispatch(setWallets(userWallets || []));

    dispatch(
      setCurrencies({
        currencies,
      }),
    );

    if (userSettings?.currency?.currencyId) {
      dispatch(
        setUserSetting({
          settings: {
            currencyId: userSettings.currency.currencyId,
          },
        }),
      );
    }
  }, [dispatch]);

  const updateSpends = useCallback(async () => {
    const {sumOfTodayTransactions, monthlySpentAmountPerWallet} =
      await agrSpendsApi();

    dispatch(
      setAggregation({
        todaySpent: sumOfTodayTransactions,
        wallet: monthlySpentAmountPerWallet?.aggregation,
      }),
    );
  }, [dispatch]);

  const signOut = useCallback(async () => {
    await deleteFromStorage('lockApp');
    await deleteFromStorage('token');
    dispatch(resetProfile());
  }, [dispatch]);

  return {
    setupInitial,
    updateSpends,
    signOut,
  };
};

export default useStartUp;
