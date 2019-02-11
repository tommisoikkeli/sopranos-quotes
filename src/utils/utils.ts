import { IQuote } from '@/models/models';

export function setLocalStorageItem(key: string, item: IQuote): void {
  if (!window.localStorage) {
    return;
  }
  const existingItems = JSON.parse(localStorage.getItem(key) || '[]');
  localStorage.setItem(key, JSON.stringify([...existingItems, item]));
}
