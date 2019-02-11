import { IQuote } from '@/models/models';

export function setLocalStorageItem(key: string, item: IQuote): void {
  if (!window.localStorage) {
    return;
  }
  const existingItems = getLocalStorageItems(key);
  localStorage.setItem(key, JSON.stringify([...existingItems, item]));
}

export function getLocalStorageItems(key: string) {
  if (!window.localStorage) {
    return;
  }
  return JSON.parse(localStorage.getItem(key) || '[]');
}
