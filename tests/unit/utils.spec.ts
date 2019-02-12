import {findById} from '../../src/utils/utils';

const exampleQuotes = [
  {
    id: 1,
    person: {
      id: 1,
      name: 'Dude',
      image: 'imageUrl',
      quotes: [],
    },
    quoteText: 'This is a great quote',
    rating: 120,
  },
  {
    id: 2,
    person: {
      id: 1,
      name: 'Guy',
      image: 'imageUrl2',
      quotes: [],
    },
    quoteText: 'This is an average quote',
    rating: 5,
  },
];

describe('util functions', () => {
  it('findById finds item correctly by id', () => {
    const result = findById(exampleQuotes, 1);
    expect(result).toEqual(exampleQuotes[0]);
  });
});
