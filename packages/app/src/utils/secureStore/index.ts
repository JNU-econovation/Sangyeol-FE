import * as SecureStore from "expo-secure-store";

export const getValueFromSecureStore = async (key: string) =>
  (await SecureStore.getItemAsync(key)) || null;

export const setValueToSecureStore = async (key: string, value: string) =>
  await SecureStore.setItemAsync(key, value);

export const removeValueFromSecureStore = async (key: string) =>
  await SecureStore.deleteItemAsync(key);
