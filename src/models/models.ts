export interface IPerson {
  id: number;
  name: string;
  image: string;
  quotes: IQuote[];
}

export interface IQuote {
  id: number;
  person: IPerson;
  quoteText: string;
  rating: number;
}
