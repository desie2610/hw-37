import { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageHeading from '../components/PageHeading/PageHeading';
import { booksOperations, booksSelectors } from '../redux/books';

export default function BookDetailsView() {
  const location = useLocation();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const idMatch = slug.match(/(\d+)$/);
  const bookId = idMatch ? Number(idMatch[1]) : null;
  const book = useSelector(state => booksSelectors.getBookById(state, bookId));
  const isLoading = useSelector(booksSelectors.getIsBookLoading);
  const error = useSelector(booksSelectors.getBookError);

  useEffect(() => {
    if (bookId !== null) {
      dispatch(booksOperations.fetchBookById(bookId));
    }
  }, [bookId, dispatch]);

  return (
    <>
      <PageHeading text={`Книга ${slug}`} />

      {isLoading && <p>Завантаження книги...</p>}
      {error && <p role="alert">{error}</p>}

      {book && (
        <>
          <Link to={location?.state?.from?.location ?? '/books'}>
            {location?.state?.from?.label ?? 'Назад'}
          </Link>
          <hr />

          <img src={book.imgUrl} alt={book.title} />
          <h2>{book.title}</h2>
          <p>
            Автор:{' '}
            {book.author?.name ??
              (isLoading ? 'Завантаження...' : 'Не вказано')}
          </p>
          <p>{book.descr}</p>
        </>
      )}

      {!isLoading && !error && !book && <p>Книгу не знайдено.</p>}
    </>
  );
}
