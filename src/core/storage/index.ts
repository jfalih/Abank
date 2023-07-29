import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';

const MMKV = new MMKVLoader().initialize();

export const useSessionStorage = () => {
  const sessionStorage = useMMKVStorage<string>('session', MMKV);
  return sessionStorage;
};

export default MMKV;
