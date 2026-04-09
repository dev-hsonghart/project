import React, { useEffect } from 'react';
import Title from '../components/common/Title';
import styled from 'styled-components';
import BooksFilter from '../components/books/BooksFilter';
import BooksEmpty from '../components/books/BooksEmpty';
import Pagination from '../components/books/Pagination';
import BooksViewSwitcher from '../components/books/BooksViewSwitcher';
import BooksList from '../components/books/BooksList';
import { useBooks } from '../hooks/useBooks';
import Loading from '@/components/common/Loading';
import { useBooksInfinite } from '@/hooks/useBooksInfinite';
import Button from '@/components/common/Button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Books = () => {
  const { books, pagination, isEmpty, isBooksLoading } = useBooks();
  const { fetchNextPage, hasNextPage } = useBooksInfinite();

  const moreRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry)=>{
      if (entry.isIntersecting ) {
        loadmore();
        observer.unobserve(entry.target);
      }
      })});
})
  
  if(moreRef.current) {
    observer.observe(moreRef.current);
  }

  return () => {
    if(moreRef.current) {
      observer.unobserve(moreRef.current);
    }
  }
}, [books]);

  const moreRef = useIntersectionObserver(([entry]) => {
    if(entry.isIntersecting) {
      loadmore();
    }
  }, { threshold: 1.0 });

  const loadmore = () => {
    if (!hasNextPage) return;
    else {
      fetchNextPage();
    }
  };

  if (!books || isBooksLoading) {
    return <Loading />;
  }

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>

        {books && !isEmpty && <BooksList books={books} />}
        {books && isEmpty && <BooksEmpty />}
        {/* {books && !isEmpty && <Pagination pagination={pagination} />} */}
        <div className="more">
          <Button
            size="large"
            scheme="normal"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
          >
            {hasNextPage ? '더보기' : '마지막 페이지입니다.'}
          </Button>
        </div>
      </BooksStyle>
    </>
  );
};

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

export default Books;
