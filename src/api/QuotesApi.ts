import { IQuote, IPerson } from '@/models/models';

const apiBaseUrl = 'http://localhost:8080';
const quotesEndpoint = 'quotes';
const peopleEndpoint = 'people';

export default {
  async getRandomQuote(): Promise<IQuote> {
    try {
      const response = await fetch(`${apiBaseUrl}/${quotesEndpoint}/random`);
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  async getPeople(): Promise<IPerson[]> {
    try {
      const response = await fetch(`${apiBaseUrl}/${peopleEndpoint}`);
      return response.json();
    } catch (e) {
      throw e;
    }
  },
  async getAllQuotesForPerson(id: number): Promise<IPerson> {
    try {
      const response = await fetch(`${apiBaseUrl}/${peopleEndpoint}/${id}`);
      return response.json();
    } catch (e) {
      throw e;
    }
  },
};
