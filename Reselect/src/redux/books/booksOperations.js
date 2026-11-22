import { createAsyncThunk } from '@reduxjs/toolkit';
import * as bookShelfAPI from 'services/bookshelf-api';

const getErrorMessage = error =>
  (error &&
    error.response &&
    error.response.data &&
    error.response.data.message) ||
  (error && error.message) ||
  'Не вдалося завантажити книги.';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      return await bookShelfAPI.fetchBooks();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (bookId, { rejectWithValue }) => {
    try {
      return await bookShelfAPI.fetchBookById(bookId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);
