import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Book } from '../models/book.model';
import { Pagination } from '../models/pagination';
import { QUERYSTRING } from '../contants/querystring';
import { fetchBooks } from '../api/books.api';
import { LIMIT } from '../contants/pagination';
import { useInfiniteQuery, useQuery } from 'react-query';

export const useBooksInfinite = () => {
  const location = useLocation();

  const getBooks = ({ pageParam }: { pageParam?: number }) => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get(QUERYSTRING.CATEGORY_ID)
      ? Number(params.get(QUERYSTRING.CATEGORY_ID))
      : undefined;
    const newBooks = params.get(QUERYSTRING.NEWS) ? true : undefined;
    const pagination = params.get(QUERYSTRING.PAGE)
      ? Number(params.get(QUERYSTRING.PAGE))
      : undefined;
    const limit = LIMIT;
    const currentPage = pageParam || 1;

    return fetchBooks({
      categoryId,
      newBooks,
      currentPage,
      limit,
    });
  };
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ['books', location.search],
    ({ pageParam = 1 }) => {
      getBooks({ pageParam });
    },
    {
      getNextPageParam: (lastPage) => {
        const isLastPage =
          Math.ceil(lastPage.pagination.totalCounts / LIMIT) ===
          lastPage.pagination.currentPage;
      },
    },
  );

  const books = data ? data.pages.flatMap((page) => page.books) : [];
  const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
  const isEmpty = books.length === 0;
  const isBooksLoading = isFetching;

  return {
    books,
    pagination,
    isEmpty,
    isBooksLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
