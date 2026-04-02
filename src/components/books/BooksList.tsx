import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookItem from './BookItem';
import { Book } from '../../models/book.model';
import { QUERYSTRING } from '../../contants/querystring';
import { useLocation } from 'react-router-dom';
import { ViewMode } from './BooksViewSwitcher';

interface Props {
  books: Book[];
}

const BooksList = ({ books = [] }: Props) => {
  const [view, setView] = useState<ViewMode>('grid');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as ViewMode);
    }
  }, [location.search]);

  console.log(books);
  return (
    <BooksListStyle view={view}>
      {books?.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </BooksListStyle>
  );
};

interface BooksListStyleProps {
  view: ViewMode;
}

const BooksListStyle = styled.div<BooksListStyleProps>`
  display: grid;
  flex-direction: ${({ view }) => (view === 'grid' ? 'column' : 'row')};
  grid-template-columns: ${({ view }) =>
    view === 'grid' ? 'repeat(4, 1fr)' : '1fr'};
  gap: 24px;
`;

export default BooksList;
