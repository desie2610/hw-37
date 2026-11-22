import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import BookDetailsView from './BookDetailsView';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: selector =>
    selector({
      books: {
        entities: [{ id: 7, title: 'Book', imgUrl: '', descr: '' }],
        isBookLoading: true,
        bookError: null,
      },
    }),
}));

test('renders a book while its author relation is still loading', () => {
  render(
    <MemoryRouter initialEntries={['/books/book-7']}>
      <Route path="/books/:slug">
        <BookDetailsView />
      </Route>
    </MemoryRouter>,
  );

  expect(screen.getByText('Автор: Завантаження...')).toBeTruthy();
});
