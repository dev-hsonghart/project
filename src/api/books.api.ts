import { Book, BookDetail } from '../models/book.model';
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
  pagination: { currentPage: number; totalCounts: number };
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>('/books', {
      params,
    });
    console.log(response.data);
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

export const fetchBook = async (bookId: string) => {
  try {
    const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const likeBook = async (bookId: number) => {
  try {
    const response = await httpClient.post(`/likes/${bookId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const unlikeBook = async (bookId: number) => {
  try {
    const response = await httpClient.delete(`/likes/${bookId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBestBooks = async () => {
  try {
    const response = await httpClient.get<Book[]>('/books/best');
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
