import { IQuote } from '@/models/models';

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
};
