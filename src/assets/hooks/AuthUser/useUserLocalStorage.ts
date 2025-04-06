import { IMe, IUserCreds } from '../../types/types';

type TUserStorageKeys = "u_token" | "u_creds";

const tokenKey = "u_token";
const credsKey = "u_creds";

const setItem = (key: TUserStorageKeys, value: any) => localStorage.setItem(key, JSON.stringify(value));

const getLocalStorageValue = (key: TUserStorageKeys) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value)
  }
  return null
}

const removeItem = (key: TUserStorageKeys) => localStorage.removeItem(key);

const useUserLocalStorage = () => {
  const setToken = (value: string) => setItem(tokenKey, value);
  const setCreds = (value: IMe) => setItem(credsKey, value);

  const getToken = () => getLocalStorageValue(tokenKey);
  const getCreds = () => getLocalStorageValue(credsKey);

  const removeToken = () => removeItem(tokenKey);
  const removeCreds = () => removeItem(credsKey);

  return {getToken, setToken, removeToken, setCreds, getCreds, removeCreds}
};

export default useUserLocalStorage;