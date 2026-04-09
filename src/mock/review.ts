import { BookReviewItem } from '@/models/book.model';
import { http, HttpResponse } from 'msw';

const mockData: BookReviewItem[] = [
  {
    id: 1,
    userName: '홍길동',
    content: '이 책 정말 좋아요!',
    createdAt: '2024-06-01T12:00:00Z',
    score: 5,
  },
  {
    id: 2,
    userName: '김철수',
    content: '내용이 조금 어렵지만 유익했어요.',
    createdAt: '2024-06-02T15:30:00Z',
    score: 4,
  },
];

export const reviewsById = http.get(
  'http://localhost:3000/books/:bookId/reviews',
  (req) => {
    const data: BookReviewItem[] = [];
    return HttpResponse.json(data, {
      status: 200,
    });
  },
);

export const addReview = http.post(
  'http://localhost:3000/books/:bookId/reviews',
  (req) => {
    return HttpResponse.json(
      {
        message: '리뷰가 성공적으로 추가되었습니다.',
      },
      {
        status: 201,
      },
    );
  },
);

export const reviewForMain = http.get(
  'http://localhost:3000/books/reviews',
  (req) => {
    return HttpResponse.json(mockData, {
      status: 200,
    });
  },
);
