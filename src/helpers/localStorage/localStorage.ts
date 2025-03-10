import type IAsyncStorageKeys from '../../types/IAsyncStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToStorage = (key: IAsyncStorageKeys, value: string) =>
  AsyncStorage.setItem(key, value);

export const getFromStorage = (key: IAsyncStorageKeys) =>
  AsyncStorage.getItem(key);

export const deleteFromStorage = (key: IAsyncStorageKeys) =>
  AsyncStorage.removeItem(key);
