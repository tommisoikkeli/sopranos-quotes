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

export function findById(quotes: IQuote[], id: number): IQuote {
  const result = quotes.filter((i: IQuote) => i.id === id);
  return result[0];
}

export function isRated(quotes: IQuote[], id: number): boolean {
  return quotes.map((i: IQuote) => i.id).indexOf(id) !== -1;
}
