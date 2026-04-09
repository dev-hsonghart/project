import { useEffect, useState } from 'react';
import { BookDetail, BookReviewItem } from '../models/book.model';
import { fetchBook, likeBook, unlikeBook } from '../api/books.api';
import { useAuthStore } from '../store/authStore';
import { showAlert } from '../utils/alerts';
import { addCart } from '../api/carts.api';
import { fetchBookReview } from '@/api/review.api';
import { useToast } from './useToast';

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const { isLoggedIn } = useAuthStore();
  const [cartAdded, setCartAdded] = useState(false);
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    if (!bookId) return;

    fetchBook(bookId).then((book) => {
      if (book) {
        setBook(book);
      }
    });

    fetchBookReview(Number(bookId)).then((reviews) => {
      setReviews(reviews);
    });
  }, [bookId]);

  const likeToggle = () => {
    // 권한 확인

    if (!isLoggedIn) {
      showToast('로그인이 필요한 기능입니다.', 'error');
      return;
    }

    if (!book) return;

    if (book.liked) {
      unlikeBook(book.id).then((response) => {
        setBook({
          ...book,
          liked: false,
          likes: book.likes - 1,
        });
      });
    } else {
      likeBook(book.id).then((response) => {
        setBook({
          ...book,
          liked: true,
          likes: book.likes + 1,
        });
      });
    }
  };

  const addTocart = (quantity: number) => {
    if (!book) return;

    addCart({
      bookId: book.id,
      count: quantity,
    }).then((response) => {
      setCartAdded(true);
      showToast('장바구니에 추가되었습니다.', 'info');
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };

  return { book, likeToggle, addTocart, cartAdded };
};
