import { Book } from '../models/book.model';
import { Pagination } from '../models/pagination';
import { httpClient } from './http';

interface FetchBooksParams {
  categoryId?: number;
  newBooks?: boolean;
  limit: number;
  currentPage?: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>('/books', {
      params,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      books: [],
      pagination: {
        currentPage: 1,
        totalCounts: 0,
      },
    };
  }
};
