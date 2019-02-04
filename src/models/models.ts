export interface IPerson {
  id: string;
  name: string;
  image: string;
  quotes: IQuote[];
}

export interface IQuote {
  id: string;
  person: IPerson;
  quoteText: string;
  rating: number;
}
