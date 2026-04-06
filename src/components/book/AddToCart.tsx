import React, { useState } from 'react';
import styled from 'styled-components';
import { BookDetail } from '../../models/book.model';
import InputText from '../common/InputText';
import Button from '../common/Button';

import { Link, Navigate } from 'react-router-dom';
import { useBook } from '../../hooks/useBook';

interface Props {
  book: BookDetail;
}

const AddTocart = ({ book }: Props) => {
  const [quantity, setQuantity] = React.useState(1);
  const { addTocart, cartAdded } = useBook(String(book.id));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    return setQuantity(value);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <AddToCartStyle $added={cartAdded}>
      <div>
        <InputText
          inputType="number"
          value={quantity}
          onChange={handleChange}
        />
        <Button size="medium" scheme="normal" onClick={handleIncrease}>
          +
        </Button>
        <Button size="medium" scheme="normal" onClick={handleDecrease}>
          -
        </Button>
      </div>
      <Button size="medium" scheme="normal" onClick={() => addTocart(quantity)}>
        장바구니 담기
      </Button>
      {cartAdded && (
        <div className="added">
          <p>장바구니에 추가되었습니다.</p>
          <Link to="/cart">장바구니로 이동</Link>
        </div>
      )}
    </AddToCartStyle>
  );
};

interface AddToCartStyleProps {
  $added: boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .added {
    position: absolute;
    right: 0;
    bottom: -90px;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({ $added }) => ($added ? 1 : 0)};
    transition: opacity 0.3s;

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;

export default AddTocart;
