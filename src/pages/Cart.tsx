import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Title from '../components/common/Title';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../hooks/useCart';
import Empty from '../components/common/Empty';
import { FaShoppingCart } from 'react-icons/fa';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import { showAlert } from '../utils/alerts';
import { OrderSheet } from '../models/order.model';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../hooks/useAlert';

const Cart = () => {
  const { carts, isEmpty, deleteCartItem } = useCart();
  const { showConfirm } = useAlert();
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const handleCheck = (bookId: number) => {
    if (checkedItems.includes(bookId)) {
      return setCheckedItems(checkedItems.filter((id) => id !== bookId));
    }
    setCheckedItems([...checkedItems, bookId]);
  };

  const handleDelete = (cartItemId: number) => {
    deleteCartItem(cartItemId);
  };

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.bookId)) {
        return acc + cart.count;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.bookId)) {
        return acc + cart.price * cart.count;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert('주문할 책을 선택해주세요.');
      return;
    }

    const orderData: Omit<OrderSheet, 'delivery'> = {
      cartItems: checkedItems,
      totalPrice,
      totalCount: totalQuantity,
      mainBookTitle: carts[0].title,
    };

    showConfirm('선택한 책을 주문하시겠습니까?', () => {
      navigate('/order', { state: orderData });
    });
  };

  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {!isEmpty && (
          <div className="content">
            {carts.map((cart) => (
              <CartItem
                key={cart.bookId}
                cart={cart}
                checkedItems={checkedItems}
                onCheck={handleCheck}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
        {isEmpty && (
          <Empty
            icon={
              /* @ts-ignore */
              <FaShoppingCart />
            }
            title="장바구니가 비어있어요."
            description="책을 추가해보세요."
          />
        )}
        <div className="summary">
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
          <Button size="large" scheme="primary" onClick={handleOrder}>
            주문하기
          </Button>
        </div>
      </CartStyle>
    </>
  );
};

export const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    h1 {
      padding: 0 0 24px 0;
    }

    border: 1px solid ${(props) => props.theme.color.border};
    border-radius: ${(props) => props.theme.borderRadius.default};
    padding: 12px;
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
      gap: 8px;

      label {
        width: 80px;
      }

      .input {
        flex: 1;
        input {
          width: 100%;
        }
      }
    }

    .error {
      color: red;
      margin: 0;
      padding: 0 0 12px 0;
      text-align: right;
    }
  }
`;

export default Cart;
