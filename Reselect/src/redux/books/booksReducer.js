import { createSlice } from '@reduxjs/toolkit';
import { fetchBookById, fetchBooks } from './booksOperations';

const initialState = {
  entities: [],
  isLoading: false,
  isBookLoading: false,
  error: null,
  bookError: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ||
          action.error.message ||
          'Не вдалося завантажити книги.';
      })
      .addCase(fetchBookById.pending, state => {
        state.isBookLoading = true;
        state.bookError = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        const bookIndex = state.entities.findIndex(
          book => String(book.id) === String(action.payload.id),
        );

        if (bookIndex === -1) {
          state.entities.push(action.payload);
        } else {
          state.entities[bookIndex] = action.payload;
        }

        state.isBookLoading = false;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.isBookLoading = false;
        state.bookError =
          action.payload ||
          action.error.message ||
          'Не вдалося завантажити книгу.';
      });
  },
});

export default booksSlice.reducer;
