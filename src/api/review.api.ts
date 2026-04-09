import { BookReviewItem } from '@/models/book.model';
import { requestHandler } from './http';

export const fetchBookReview = async (bookId: number) => {
  const response = await requestHandler<BookReviewItem[]>(
    'get',
    `/books/${bookId}/reviews`,
  );
  return response.data;
};

export const fetchReviewAll = async () => {
  const response = await requestHandler<BookReviewItem[]>(
    'get',
    `/books/reviews`,
  );
  return response.data;
};
