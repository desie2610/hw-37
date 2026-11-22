import { getBookById } from './booksSelectors';

const book = { id: 7, title: 'Book' };
const state = {
  books: {
    entities: [book],
  },
};

test('selects and memoizes a book by numeric or string ID', () => {
  getBookById.resetRecomputations();

  expect(getBookById(state, 7)).toBe(book);
  expect(getBookById(state, 7)).toBe(book);
  expect(getBookById.recomputations()).toBe(1);
  expect(getBookById(state, '7')).toBe(book);
});
