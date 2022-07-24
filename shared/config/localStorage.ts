import { isBrowser } from "shared/utils";

export interface IStorageItem {
  key: string;
  value: string;
}

export class StorageItem {
  key: string;

  value: string;

  constructor(data: IStorageItem) {
    this.key = data.key;
    this.value = data.value;
  }
}

export const LocalStorage = {
  add(key: string, item: string) {
    isBrowser() && localStorage.setItem(key, item);
  },
  get(key: string) {
    return isBrowser() ? localStorage.getItem(key) : undefined;
  },
  remove(key: string) {
    isBrowser() && localStorage.removeItem(key);
  },
  clear() {
    isBrowser() && localStorage.clear();
  },
};
