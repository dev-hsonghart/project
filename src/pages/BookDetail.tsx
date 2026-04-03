import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useBook } from '../hooks/useBook';
import { getImgSrc } from '../utils/image';
import Title from '../components/common/Title';
import { BookDetail as BookDetailType } from '../models/book.model';
import { formatDate, formatNumber } from '../utils/formmat';
import { QUERYSTRING } from '../contants/querystring';
import EllipsisBox from '../components/common/EllipsisBox';
import LikeButton from '../components/book/LikeButton';
import AddToCart from '../components/book/AddTocart';

const bookInfoList = [
  {
    label: '카테고리',
    key: 'categoryName',
    filter: (book: BookDetailType) => {
      return (
        <Link to={`/books?${QUERYSTRING.CATEGORY_ID}=${book.categoryId}`}>
          {book.categoryName}
        </Link>
      );
    },
  },
  {
    label: '페이지',
    key: 'pages',
  },
  {
    label: 'ISBN',
    key: 'isbn',
  },
  {
    label: '출간일',
    key: 'pubDate',
    filter: (book: BookDetailType) => {
      return formatDate(book.pubDate);
    },
  },
  {
    label: '가격',
    key: 'price',
    filter: (book: BookDetailType) => {
      return `${formatNumber(book.price)}원`;
    },
  },
];

const BookDetail = () => {
  const { bookId } = useParams();
  const { book, likeToggle } = useBook(bookId);

  if (!book) {
    return <BookDetailStyle>북을 불러오는 중...</BookDetailStyle>;
  }

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="ijg">
          <img src={getImgSrc(book.imgUrl)} alt={book.title} />
        </div>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>
          <dl>
            <dt>카테고리</dt>
            <dd>{book.categoryName}</dd>
          </dl>
          <dl>
            <dt>저자</dt>
            <dd>{book.author}</dd>
          </dl>
          {bookInfoList.map((info) => (
            <dl key={info.key}>
              <dt>{info.label}</dt>
              <dd>
                {info.filter
                  ? info.filter(book)
                  : book[info.key as keyof BookDetailType]}
              </dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>

          <div className="like">
            <LikeButton book={book} onClick={likeToggle} />
          </div>
          <div className="add-cart">
            <button>장바구니 추가</button>
            <AddToCart book={book} />
          </div>
        </div>
      </header>
      <div className="content">
        <Title size="medium">상세 설명</Title>
        <EllipsisBox lineLimit={4}>{book.detail}</EllipsisBox>
        <Title size="medium">목차</Title>
        <p className="index">{book.contents}</p>
      </div>
    </BookDetailStyle>
  );
};

const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;

    .img {
      flex: 1;
      img {
        width: 100%;
        height: auto;
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      dl {
        display: flex;
        margin: 0;
        dt {
          width: 80px;
          color: ${({ theme }) => theme.color.secondary};
        }
        a {
          color: ${({ theme }) => theme.color.primary};
        }
      }
    }
  }

  .content {
    .detail {
      height: 200px;
    }
  }
`;
export default BookDetail;
