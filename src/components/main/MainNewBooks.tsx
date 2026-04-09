import { Book } from '@/models/book.model';
import React from 'react';
import styled from 'styled-components';
import BookItem from '../books/BookItem';

interface Props {
  books: Book[];
}

const MainNewBooks = ({ books }: Props) => {
  return (
    <MainNewBooksStyle>
      {books.map((book) => (
        <BookItem key={book.id} book={book} view="grid">
          {book.title}
        </BookItem>
      ))}
    </MainNewBooksStyle>
  );
};

const MainNewBooksStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;

  @media screen and (max-width: ${({ theme }) => theme.mediaQuery.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default MainNewBooks;
