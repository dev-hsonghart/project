import { useEffect, useState } from 'react';
import { Cart } from '../models/cart.model';
import { deleteCart, fetchCart } from '../api/carts.api';

export const useCart = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const deleteCartItem = (cartItemId: number) => {
    deleteCart(cartItemId).then(() => {
      setCarts(carts.filter((cart) => cart.cartItemId !== cartItemId));
      setIsEmpty(carts.length === 0);
    });
  };

  useEffect(() => {
    fetchCart().then((data) => {
      setCarts(data);
      setIsEmpty(data.length === 0);
    });
  }, []);

  return { carts, isEmpty, deleteCartItem };
};
