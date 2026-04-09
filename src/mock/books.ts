import { Book, BookReviewItem } from '@/models/book.model';
import { http, HttpResponse } from 'msw';

const bestBooksData: Book[] = [
  {
    id: 1,
    categoryId: 2,
    title: '어린 왕자',
    imgUrl: 30,
    author: '생택쥐페리',
    isbn: '1234567890',
    pages: 96,
    summary: '어린 왕자의 모험과 철학을 담은 이야기',
    price: 12000,
    pubDate: '1943-04-06',
    detail: '어린 왕자의 상세 내용',
    contents: '어린 왕자의 목차',
    liked: true,
    totalLikes: 100,
  },
  {
    id: 2,
    categoryId: 1,
    title: '해리 포터와 마법사의 돌',
    imgUrl: 31,
    author: 'J.K. 롤링',
    isbn: '0987654321',
    pages: 309,
    summary: '해리 포터 시리즈의 첫 번째 책',
    price: 15000,
    pubDate: '1997-06-26',
    detail: '해리 포터와 마법사의 돌 상세 내용',
    contents: '해리 포터와 마법사의 돌 목차',
    liked: false,
    totalLikes: 200,
  },
];

export const bestBooks = http.get('http://localhost:3000/books/best', (req) => {
  const data: BookReviewItem[] = [];
  return HttpResponse.json(bestBooksData, {
    status: 200,
  });
});
