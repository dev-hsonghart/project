import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Book } from '../models/book.model';
import { Pagination } from '../models/pagination';
import { QUERYSTRING } from '../contants/querystring';
import { fetchBooks } from '../api/books.api';
import { LIMIT } from '../contants/pagination';
import { useQuery } from 'react-query';

export const useBooks = () => {
  const location = useLocation();
  const { data: booksData, isLoading: isBooksLoading } = useQuery(
    ['books', location.search],
    () => {
      const params = new URLSearchParams(location.search);
      return fetchBooks({
        categoryId: params.get(QUERYSTRING.CATEGORY_ID)
          ? Number(params.get(QUERYSTRING.CATEGORY_ID))
          : undefined,
        newBooks: params.get(QUERYSTRING.NEWS) ? true : undefined,
        currentPage: params.get(QUERYSTRING.PAGE)
          ? Number(params.get(QUERYSTRING.PAGE))
          : 1,
        limit: LIMIT,
      });
    },
  );

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);

  //   .then(({ books, pagination }) => {
  //     const bookList = books || [];
  //     setBooks(bookList);
  //     setPagination(pagination);
  //     setIsEmpty(bookList.length === 0);
  //   });
  // }, [location.search]);

  return {
    books: booksData?.books || [],
    pagination: booksData?.pagination,
    isEmpty: booksData ? booksData.books.length === 0 : false,
    isBooksLoading,
  };
};
