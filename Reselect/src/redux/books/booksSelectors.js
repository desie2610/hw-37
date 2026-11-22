import { createSelector } from 'reselect';

export const getBooks = state => state.books.entities;

export const getBookById = createSelector(
  [getBooks, (_, bookId) => bookId],
  (books, bookId) => books.find(book => String(book.id) === String(bookId)),
);

export const getIsLoading = state => state.books.isLoading;
export const getError = state => state.books.error;
export const getIsBookLoading = state => state.books.isBookLoading;
export const getBookError = state => state.books.bookError;
