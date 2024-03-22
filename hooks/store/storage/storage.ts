import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { PersistStorage, StorageValue } from 'zustand/middleware';

export const storage: PersistStorage<any> = {
  getItem: async (name: string) => {
    const data = await getItemAsync(name);
    if (!data) return null;
    return JSON.parse(data);
  },
  setItem: async (name: string, value: StorageValue<any>) => {
    await setItemAsync(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    await deleteItemAsync(name);
  }
};
