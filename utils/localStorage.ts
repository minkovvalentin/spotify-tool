export enum Keys {
    isUserAuthenticated = 'sp-tool-authenticated'
}
const setLocalStorageValue = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

const getLocalStorageValue = (key: string) => {
  return localStorage.getItem(key);
};

export { setLocalStorageValue, getLocalStorageValue };
