import React, { useMemo } from 'react';
import { Cart } from '../../models/cart.model';
import styled from 'styled-components';
import Title from '../common/Title';
import { formatNumber } from '../../utils/formmat';
import Button from '../common/Button';
import CheckIconButton from './CheckIconButton';
import { useAlert } from '../../hooks/useAlert';

interface Props {
  cart: Cart;
  checkedItems?: number[];
  onCheck?: (bookId: number) => void;
  onDelete?: (bookId: number) => void;
}

const CartItem = ({ cart, checkedItems, onCheck, onDelete }: Props) => {
  const { showConfirm } = useAlert();

  const isChecked = useMemo(() => {
    if (!checkedItems) return false;
    return checkedItems.includes(cart.bookId);
  }, [checkedItems, cart.bookId]);

  const handleCheck = () => {
    if (onCheck) {
      onCheck(cart.bookId);
    }
  };

  const handleDelete = () => {
    showConfirm('장바구니에서 삭제하시겠습니까?', () => {
      if (onDelete) {
        onDelete(cart.cartItemId);
      }
    });
  };

  return (
    <CartItemStyle>
      <div className="info">
        <div className="check">
          <CheckIconButton isChecked={isChecked} onCheck={handleCheck} />
        </div>
        <Title size="medium">{cart.title}</Title>
        <p className="summary">{cart.summary}</p>
        <p className="price">{formatNumber(cart.price)}원</p>
        <p className="quantity">{cart.count}개</p>
      </div>
      <Button size="medium" scheme="normal" onClick={handleDelete}>
        장바구니 삭제
      </Button>
    </CartItemStyle>
  );
};

const CartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: ${(props) => props.theme.borderRadius.default};
  padding: 12px;

  .info {
    display: flex;
    align-items: start;
    flex: 1;

    .check {
      width: 40px;
      flex-shrink: 0;
    }

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;
export default CartItem;
