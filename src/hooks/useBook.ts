import { useEffect, useState } from 'react';
import { BookDetail } from '../models/book.model';
import { fetchBook, likeBook, unlikeBook } from '../api/books.api';
import { useAuthStore } from '../store/authStore';
import { showAlert } from '../utils/alerts';
import { addCart } from '../api/carts.api';

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const { isLoggedIn } = useAuthStore();
  const [cartAdded, setCartAdded] = useState(false);

  useEffect(() => {
    if (!bookId) return;

    fetchBook(bookId).then((book) => {
      if (book) {
        setBook(book);
      }
    });
  }, [bookId]);

  const likeToggle = () => {
    // 권한 확인

    if (!isLoggedIn) {
      showAlert('로그인이 필요한 기능입니다.');
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
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };
  return { book, likeToggle, addTocart, cartAdded };
};
