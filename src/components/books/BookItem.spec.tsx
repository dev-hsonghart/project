import React from 'react';
import { render } from '@testing-library/react';
import BookItem from './BookItem';
import { formatNumber } from '../../utils/formmat';

const dummyBook = {
  id: 2,
  categoryId: 1,
  title: '인어공주',
  imgUrl: 23,
  author: '디즈니',
  isbn: '123-45678901333',
  pages: 96,
  summary: '인어가 사람이 되는 이야기',
  price: 10000,
  pubDate: '1943-04-06',
  detail: '인어공주의 상세 내용',
  contents: '인어공주의 목차',
  liked: false,
  totalLikes: 0,
};

describe('BookItem', () => {
  it('렌더가 잘 되고 있나요', () => {
    const { getByText } = render(<BookItem book={dummyBook} />);

    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText(`${formatNumber(dummyBook.price)}원`)).toBeInTheDocument();
  });
});
